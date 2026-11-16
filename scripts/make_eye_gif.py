from math import exp, pi, sin, sqrt
from pathlib import Path

from PIL import Image, ImageDraw


SIZE = 512
SCALE = 2
FRAME_COUNT = 60
BACKGROUND = "#180f25"
OUTLINE = "#f8edcf"
SCLERA = "#fff9ea"
IRIS = "#63d6b3"
PUPIL = "#2c1638"
ACCENT = "#ff735f"


def almond(cx, cy, half_width, half_height, steps=80):
    top = []
    bottom = []
    for index in range(steps + 1):
        unit = index / steps
        x = cx - half_width + 2 * half_width * unit
        curve = sin(pi * unit)
        top.append((x, cy - half_height * curve))
        bottom.append((x, cy + half_height * curve))
    return top + list(reversed(bottom))


def blink_openness(frame):
    openness = 1.0
    for center in (18, 50):
        distance = min(abs(frame - center), FRAME_COUNT - abs(frame - center))
        openness -= 0.96 * exp(-((distance / 1.35) ** 2))
    return max(0.04, openness)


def draw_frame(frame):
    size = SIZE * SCALE
    image = Image.new("RGB", (size, size), BACKGROUND)
    draw = ImageDraw.Draw(image)
    cx = cy = size // 2
    openness = blink_openness(frame)

    # A tiny coral tick gives the mark a playful, recognizable signature.
    tick_width = 9 * SCALE
    draw.rounded_rectangle(
        (cx - tick_width // 2, 91 * SCALE, cx + tick_width // 2, 132 * SCALE),
        radius=tick_width // 2,
        fill=ACCENT,
    )

    outer_height = 106 * SCALE * openness
    inner_height = max(3 * SCALE, outer_height - 15 * SCALE)
    outer = almond(cx, cy, 184 * SCALE, outer_height)
    inner = almond(cx, cy, 169 * SCALE, inner_height)
    draw.polygon(outer, fill=OUTLINE)
    draw.polygon(inner, fill=SCLERA)

    if openness > 0.16:
        eye_mask = Image.new("L", (size, size), 0)
        ImageDraw.Draw(eye_mask).polygon(inner, fill=255)
        iris_layer = Image.new("RGB", (size, size), BACKGROUND)
        iris_draw = ImageDraw.Draw(iris_layer)

        motion = sin(2 * pi * frame / FRAME_COUNT)
        iris_x = cx + int(76 * SCALE * motion)
        iris_y = cy + int(7 * SCALE * sin(4 * pi * frame / FRAME_COUNT))
        iris_radius = 67 * SCALE
        pupil_radius = 30 * SCALE
        iris_draw.ellipse(
            (iris_x - iris_radius, iris_y - iris_radius,
             iris_x + iris_radius, iris_y + iris_radius),
            fill=IRIS,
        )
        iris_draw.ellipse(
            (iris_x - pupil_radius, iris_y - pupil_radius,
             iris_x + pupil_radius, iris_y + pupil_radius),
            fill=PUPIL,
        )
        highlight = 12 * SCALE
        iris_draw.ellipse(
            (iris_x - 11 * SCALE - highlight, iris_y - 16 * SCALE - highlight,
             iris_x - 11 * SCALE + highlight, iris_y - 16 * SCALE + highlight),
            fill="#ffffff",
        )
        image.paste(iris_layer, mask=eye_mask)

        # Redraw the outline so the iris never covers the eyelid edge.
        draw = ImageDraw.Draw(image)
        draw.line(outer[:81], fill=OUTLINE, width=10 * SCALE, joint="curve")
        draw.line(outer[81:], fill=OUTLINE, width=10 * SCALE, joint="curve")
    else:
        draw = ImageDraw.Draw(image)
        closed_line = almond(cx, cy, 176 * SCALE, 5 * SCALE)[:81]
        draw.line(closed_line, fill=OUTLINE, width=11 * SCALE, joint="curve")

    return image.resize((SIZE, SIZE), Image.Resampling.LANCZOS)


def main():
    output = Path(__file__).resolve().parents[1] / "public" / "jasos-eye.gif"
    frames = [draw_frame(frame) for frame in range(FRAME_COUNT)]
    frames[0].save(
        output,
        save_all=True,
        append_images=frames[1:],
        duration=65,
        loop=0,
        optimize=True,
        disposal=2,
    )
    print(output)


if __name__ == "__main__":
    main()
