# -*- coding: utf-8 -*-
"""Generate a branded Hearth & Honey menu PDF matching the website styling."""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_RIGHT, TA_CENTER, TA_LEFT
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table,
    TableStyle, KeepTogether,
)
from reportlab.lib.styles import ParagraphStyle

# ---- Brand palette ----
CREAM       = HexColor("#faf4ea")
CREAM_DEEP  = HexColor("#f3e9d7")
TERRACOTTA  = HexColor("#c8623f")
TERRA_DEEP  = HexColor("#a84e2f")
HONEY       = HexColor("#e0a458")
BARK        = HexColor("#3a2c22")
BARK_SOFT   = HexColor("#6b5848")

PAGE_W, PAGE_H = A4
MARGIN = 18 * mm

# ---- Styles ----
brand = ParagraphStyle("brand", fontName="Times-Bold", fontSize=30, textColor=BARK,
                       alignment=TA_CENTER, leading=32)
brand_sub = ParagraphStyle("brand_sub", fontName="Helvetica", fontSize=9.5, textColor=BARK_SOFT,
                           alignment=TA_CENTER, leading=14, spaceBefore=4)
eyebrow = ParagraphStyle("eyebrow", fontName="Helvetica-Bold", fontSize=7.5, textColor=TERRACOTTA,
                         alignment=TA_LEFT, leading=11, spaceBefore=2)
sec_title = ParagraphStyle("sec_title", fontName="Times-Bold", fontSize=17, textColor=BARK,
                           alignment=TA_LEFT, leading=20, spaceAfter=2)
item_name = ParagraphStyle("item_name", fontName="Times-Bold", fontSize=11.5, textColor=BARK, leading=14)
item_desc = ParagraphStyle("item_desc", fontName="Helvetica", fontSize=8.5, textColor=BARK_SOFT,
                           leading=11, spaceBefore=1)
item_price = ParagraphStyle("item_price", fontName="Times-Bold", fontSize=11.5, textColor=TERRA_DEEP,
                            alignment=TA_RIGHT, leading=14)

# ---- Menu data: (name, description, price, tags) ----
MENU = [
    ("All-Day Breakfast", "Served all day, just like home", [
        ("Honey-Butter Buttermilk Stack", "Pillowy pancakes, warm honey butter, seasonal berries, a dusting of cinnamon.", "$12", "Most Loved"),
        ("Garden Sourdough & Egg", "Thick-cut sourdough, smashed avocado, soft-poached farm egg, chili honey.", "$11", "V"),
        ("The Big Hearth Breakfast", "Two eggs your way, smoked bacon or maple sausage, roast tomato, sauteed greens, sourdough toast.", "$15", ""),
        ("Slow-Baked Granola Bowl", "House granola, thick yogurt, poached pear, toasted almonds, a drizzle of raw honey.", "$10", "V"),
        ("Farmhouse Veggie Scramble", "Soft-scrambled eggs, spinach, roasted peppers, melted cheddar, herbed potatoes.", "$13", "V"),
        ("Cinnamon French Toast", "Brioche soaked in vanilla custard, griddled golden, mascarpone, warm berry compote.", "$13", ""),
    ]),
    ("Comfort Plates", "Lunch & all-afternoon", [
        ("Three-Cheese Melt", "Sharp cheddar, gruyere & mozzarella on buttery griddled sourdough.", "$10", "Crowd Pleaser"),
        ("Soup of the Day & Crust", "A slow-simmered seasonal pot, warm crusty bread, good butter.", "$9", "V"),
        ("Roast Chicken & Herb Sandwich", "Slow-roasted chicken, lemon-herb mayo, crisp greens, tomato on ciabatta.", "$13", ""),
        ("Harvest Grain Bowl", "Roasted squash, quinoa, chickpeas, kale, feta, toasted seeds, tahini dressing.", "$14", "V / GF"),
        ("Mac & Three Cheese", "Baked until golden, crunchy herb-crumb top. Pure nostalgia in a dish.", "$12", "V"),
        ("Hearth Quiche & Side Salad", "Buttery short-crust quiche of the day, dressed leaves, pickled shallots.", "$12", "V"),
    ]),
    ("From the Bakery", "Baked fresh, all morning long", [
        ("Grandma's Cinnamon Rolls", "Gooey, hand-rolled, frosted while still warm.", "$6", "Baked Daily"),
        ("Butter Croissant", "Laminated over three days, shatteringly flaky.", "$4", "V"),
        ("Blueberry Streusel Muffin", "Bursting with berries, crunchy brown-sugar top.", "$4.50", "V"),
        ("Banana Walnut Loaf", "Moist, lightly spiced, served warm with butter.", "$5", "V"),
        ("Sea-Salt Chocolate Cookie", "Crisp edges, molten middle, flaky salt finish.", "$3.50", "V"),
        ("Lemon & Almond Cake", "Bright, tender, dusted with icing sugar.", "$5.50", "GF"),
    ]),
    ("Coffee & Warm Drinks", "Roasted just down the road  -  oat, almond & soy always available", [
        ("The Hearth Latte", "Double shot, a whisper of vanilla & raw honey.", "$5", "Signature"),
        ("Flat White", "Velvety microfoam, strong and smooth.", "$4.50", ""),
        ("Filter / Pour-Over", "Single-origin, rotating seasonally. Ask us what's brewing.", "$4", ""),
        ("Cappuccino", "Equal parts espresso, steamed milk & foam.", "$4.50", ""),
        ("Spiced Golden Chai", "House-spiced, frothed with your milk of choice.", "$4.50", ""),
        ("Honey-Vanilla Hot Chocolate", "Real melted chocolate, marshmallows on request.", "$5", ""),
        ("Loose-Leaf Tea Pot", "English breakfast, earl grey, peppermint, chamomile.", "$4", ""),
        ("Matcha Latte", "Ceremonial-grade, smooth and grassy-sweet.", "$5.50", "V"),
    ]),
    ("Cold & Fresh", "Made to order, never from a carton", [
        ("Iced Honey Latte", "Our signature, over ice with raw honey.", "$5.50", ""),
        ("Cold Brew", "Steeped 18 hours, smooth and bold.", "$5", ""),
        ("Berry Sunrise Smoothie", "Mixed berries, banana, yogurt, a touch of honey.", "$7", "V / GF"),
        ("Fresh Orange Juice", "Squeezed this morning, nothing added.", "$5", "V / GF"),
    ]),
    ("For the Littles", "Made for small hands  -  ages 10 & under", [
        ("Mini Pancake Trio", "Three little pancakes, maple syrup, fresh fruit.", "$6", "V"),
        ("Egg & Soldiers", "Soft-boiled egg with buttered sourdough strips.", "$5", "V"),
        ("Little Cheese Toastie", "Melty cheddar on griddled bread, cut into triangles.", "$5", "V"),
        ("Babyccino", "Frothy warm milk, cocoa dusting, tiny marshmallow.", "$2.50", "V"),
    ]),
]


def tag_html(tag):
    if not tag:
        return ""
    return f' <font size=6 color="#a84e2f">[{tag}]</font>'


def build_section(title, sub, items):
    elems = [Paragraph(sub.upper(), eyebrow), Paragraph(title, sec_title), Spacer(1, 5)]
    rows = []
    for name, desc, price, tag in items:
        left = Paragraph(f"{name}{tag_html(tag)}<br/>{desc}", item_name_with_desc(name, desc, tag))
        rows.append([left, Paragraph(price, item_price)])
    col_w = [ (PAGE_W - 2*MARGIN) * 0.80, (PAGE_W - 2*MARGIN) * 0.20 ]
    t = Table(rows, colWidths=col_w)
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("LINEBELOW", (0, 0), (-1, -2), 0.5, HexColor("#d8c9b3"), None, (1, 2)),
    ]))
    elems.append(t)
    elems.append(Spacer(1, 16))
    return elems


def item_name_with_desc(name, desc, tag):
    # one combined paragraph style: name bold then desc on new line handled inline
    return ParagraphStyle("combo", fontName="Times-Bold", fontSize=11.5, textColor=BARK, leading=14)


# Build description as separate line with its own style by using <br/> + font tags
def build_section2(title, sub, items):
    elems = [Paragraph(sub.upper(), eyebrow), Paragraph(title, sec_title), Spacer(1, 5)]
    rows = []
    for name, desc, price, tag in items:
        html = (f'<font name="Times-Bold" size=11.5 color="#3a2c22">{name}</font>'
                f'{tag_html(tag)}<br/>'
                f'<font name="Helvetica" size=8.5 color="#6b5848">{desc}</font>')
        left = Paragraph(html, ParagraphStyle("l", leading=13))
        rows.append([left, Paragraph(price, item_price)])
    col_w = [(PAGE_W - 2*MARGIN) * 0.80, (PAGE_W - 2*MARGIN) * 0.20]
    t = Table(rows, colWidths=col_w)
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("LINEBELOW", (0, 0), (-1, -2), 0.5, HexColor("#d8c9b3"), None, (1, 2)),
    ]))
    elems.append(KeepTogether(elems[:0]))  # noop
    return [Paragraph(sub.upper(), eyebrow), Paragraph(title, sec_title), Spacer(1, 4), t, Spacer(1, 16)]


def on_page(canvas, doc):
    canvas.saveState()
    # cream background
    canvas.setFillColor(CREAM)
    canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    # top accent bar
    canvas.setFillColor(TERRACOTTA)
    canvas.rect(0, PAGE_H - 6*mm, PAGE_W, 6*mm, fill=1, stroke=0)
    # footer
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(BARK_SOFT)
    canvas.drawCentredString(PAGE_W/2, 12*mm,
        "84 Maple Lane, Riverside, OR 97000   -   (555) 012-0147   -   hello@hearthandhoney.cafe")
    canvas.drawCentredString(PAGE_W/2, 8*mm,
        "Mon-Fri 7am-8pm  -  Sat-Sun 8am-9pm        Designed by Wai Wai Phua")
    canvas.restoreState()


def main():
    doc = BaseDocTemplate("menu.pdf", pagesize=A4,
                          leftMargin=MARGIN, rightMargin=MARGIN,
                          topMargin=22*mm, bottomMargin=20*mm,
                          title="Hearth & Honey Cafe - Menu", author="Hearth & Honey Cafe")
    frame = Frame(MARGIN, 20*mm, PAGE_W - 2*MARGIN, PAGE_H - 42*mm, id="main")
    doc.addPageTemplates([PageTemplate(id="all", frames=[frame], onPage=on_page)])

    story = []
    story.append(Paragraph("Hearth &amp; Honey", brand))
    story.append(Paragraph("COZY NEIGHBORHOOD CAFE  -  COMFORT FOOD THAT TASTES LIKE HOME  -  SINCE 2014", brand_sub))
    story.append(Spacer(1, 16))
    for title, sub, items in MENU:
        for el in build_section2(title, sub, items):
            story.append(el)
    # dietary note
    note = ParagraphStyle("note", fontName="Helvetica-Oblique", fontSize=8, textColor=BARK_SOFT,
                          alignment=TA_CENTER, leading=12)
    story.append(Spacer(1, 4))
    story.append(Paragraph("V = Vegetarian   |   GF = Gluten-free   |   Vegan options available, just ask.   "
                           "Got an allergy? Tell us  -  we'll take care of you.", note))
    doc.build(story)
    print("menu.pdf generated")


if __name__ == "__main__":
    main()
