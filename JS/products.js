const products = [
    {
        id: 1,
        name: "Sambalpuri Ikat Saree",
        price: 4999,
        image: "../ASSETS/IMAGES/products/sambalpuri-ikat-saree.jpg",
        category: "Women Collection",
        description: "Traditional Sambalpuri Ikat Saree handcrafted by Odisha artisans using authentic weaving techniques.",
        fabric: "Handwoven Cotton",
        technique: "Ikat Weaving",
        origin: "Odisha, India",
        care: "Dry Clean Recommended",
        artisan: "Traditional Odisha Weaver"
    },
    {
        id: 2,
        name: "Bomkai Silk Saree",
        price: 6499,
        image: "../ASSETS/IMAGES/products/bomkai-saree.jpg",
        category: "Women Collection",
        description: "A premium Bomkai silk saree representing Odisha's rich weaving tradition and artisan craftsmanship.",
        fabric: "Silk",
        technique: "Handloom Weaving",
        origin: "Odisha, India",
        care: "Dry Clean Recommended",
        artisan: "Bomkai Artisan Community"
    },
    {
        id: 3,
        name: "Khandua Silk Saree",
        price: 7499,
        image: "../ASSETS/IMAGES/products/khandua-silk.jpg",
        category: "Women Collection",
        description: "A traditional Khandua silk saree inspired by Odisha temple culture and heritage weaving.",
        fabric: "Silk",
        technique: "Temple-Inspired Weaving",
        origin: "Odisha, India",
        care: "Gentle Dry Clean",
        artisan: "Temple Heritage Weaver"
    },
    {
        id: 4,
        name: "Sambalpuri Dupatta",
        price: 1499,
        image: "../ASSETS/IMAGES/products/sambalpuri-dupatta.jpg",
        category: "Women Collection",
        description: "A lightweight Sambalpuri cotton dupatta showcasing Odisha weaving tradition.",
        fabric: "Cotton",
        technique: "Handloom Weaving",
        origin: "Odisha, India",
        care: "Hand Wash Cold",
        artisan: "Traditional Odisha Weaver"
    },
    {
        id: 5,
        name: "Sambalpuri Shirt",
        price: 2999,
        image: "../ASSETS/IMAGES/products/sambalpuri-shirt.jpg",
        category: "Men Collection",
        description: "A premium Sambalpuri handloom shirt made for modern men with traditional Odisha charm.",
        fabric: "Cotton Blend",
        technique: "Handloom Weaving",
        origin: "Odisha, India",
        care: "Machine Wash Gentle",
        artisan: "Odisha Handloom Artisan"
    },
    {
        id: 6,
        name: "Traditional Kurta",
        price: 2499,
        image: "../ASSETS/IMAGES/products/odisha-kurta.jpg",
        category: "Men Collection",
        description: "A lightweight cotton kurta reflecting the comfort and style of Odisha handloom traditions.",
        fabric: "Cotton",
        technique: "Handloom Tailoring",
        origin: "Odisha, India",
        care: "Gentle Hand Wash",
        artisan: "Odisha Fashion Artisan"
    },
    {
        id: 7,
        name: "Men's Ikat Stole",
        price: 1899,
        image: "../ASSETS/IMAGES/products/mens-ikat-stole.jpg",
        category: "Men Collection",
        description: "A refined men's ikat stole designed for elegance and traditional craftsmanship.",
        fabric: "Silk Blend",
        technique: "Ikat Weaving",
        origin: "Odisha, India",
        care: "Dry Clean Recommended",
        artisan: "Odisha Textile Artisan"
    },
    {
        id: 8,
        name: "Pattachitra Painting",
        price: 2499,
        image: "../ASSETS/IMAGES/products/pattachitra.jpg",
        category: "Handicrafts",
        description: "A traditional Pattachitra artwork created by skilled Odisha artists using heritage painting techniques.",
        fabric: "Natural Canvas",
        technique: "Pattachitra Art",
        origin: "Odisha, India",
        care: "Keep Away From Moisture",
        artisan: "Odisha Artist"
    },
    {
        id: 9,
        name: "Dhokra Metal Craft",
        price: 3499,
        image: "../ASSETS/IMAGES/products/dhokra.jpg",
        category: "Handicrafts",
        description: "A unique handcrafted Dhokra metal artwork created using the ancient lost wax technique.",
        fabric: "Bronze Alloy",
        technique: "Lost Wax Casting",
        origin: "Odisha, India",
        care: "Clean With Soft Cloth",
        artisan: "Tribal Metal Craft Artisan"
    },
    {
        id: 10,
        name: "Terracotta Craft",
        price: 1799,
        image: "../ASSETS/IMAGES/products/terracotta.jpg",
        category: "Handicrafts",
        description: "A handcrafted terracotta artwork celebrating the earthy elegance of Odisha craftsmanship.",
        fabric: "Natural Clay",
        technique: "Terracotta Handcraft",
        origin: "Odisha, India",
        care: "Avoid Water Exposure",
        artisan: "Terracotta Artisan"
    },
    {
        id: 11,
        name: "Stone Carving Artwork",
        price: 4999,
        image: "../ASSETS/IMAGES/products/stone-carving.jpg",
        category: "Handicrafts",
        description: "A beautiful stone carving inspired by the timeless temple art of Odisha.",
        fabric: "Natural Stone",
        technique: "Stone Carving",
        origin: "Odisha, India",
        care: "Dust With Dry Cloth",
        artisan: "Temple Stone Carver"
    },
    {
        id: 12,
        name: "Palm Leaf Engraving",
        price: 1999,
        image: "../ASSETS/IMAGES/products/palm-leaf.jpg",
        category: "Handicrafts",
        description: "An intricate palm leaf engraving preserving the artistic heritage of Odisha.",
        fabric: "Palm Leaf",
        technique: "Engraving",
        origin: "Odisha, India",
        care: "Keep Away From Humidity",
        artisan: "Palm Leaf Artist"
    }
];

/* ==========================================================
   SUTRIKA - BACK TO TOP BUTTON
========================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const backToTop = document.createElement("button");

    backToTop.className = "sutrika-back-to-top";
    backToTop.innerHTML = "↑";

    backToTop.setAttribute("aria-label", "Back to top");
    backToTop.setAttribute("title", "Back to top");

    document.body.appendChild(backToTop);


    /* Show button after scrolling */

    window.addEventListener("scroll", function () {

        if (window.scrollY > 400) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });


    /* Smoothly return to top */

    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});
