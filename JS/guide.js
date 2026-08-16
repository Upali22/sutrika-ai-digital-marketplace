/* ==========================================
   SUTRIKA GUIDE - PART 1
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       SMOOTH SCROLL
    ========================================== */

    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach(link => {

        link.addEventListener("click", function (e) {

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                target.scrollIntoView({

                    behavior: "smooth"

                });

            }

        });

    });


/* ==========================================
   SUTRIKA REAL AI CHAT
========================================== */

const chatInput = document.querySelector(".chat-input");
const sendButton = document.querySelector(".chat-send");
const chatBox = document.querySelector(".ai-chat");
let aiIsThinking = false;


/* ==========================================
   SEND MESSAGE
========================================== */

/* ==========================================
   SEND MESSAGE
========================================== */

async function askQuestion() {

    if (!chatInput || !chatBox) {

        console.error(
            "Sutrika chat elements not found."
        );

        return;
    }


    /* Prevent duplicate messages */

    if (aiIsThinking) {
        return;
    }


    const question =
        chatInput.value.trim();


    if (!question) {
        return;
    }


    /* Lock chatbot */

    aiIsThinking = true;


    if (sendButton) {

        sendButton.disabled = true;

        sendButton.classList.add(
            "sending"
        );

    }


    /* Show user's message */

    addUserMessage(question);


    /* Clear input */

    chatInput.value = "";


    /* Show typing indicator */

    const typingMessage =
        addTypingMessage();


    try {

        let imageData = null;

        let imageMimeType = null;


        /* ==========================================
           IMAGE → BASE64
        ========================================== */

        if (
            selectedAttachment &&
            selectedAttachment.type.startsWith(
                "image/"
            )
        ) {

            imageData =
                await fileToBase64(
                    selectedAttachment
                );

            imageMimeType =
                selectedAttachment.type;

        }


        /* ==========================================
           SEND TO SUTRIKA AI
        ========================================== */

        const response =
            await fetch(
                "http://localhost:5000/api/guide/chat",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify({

                        message: question,

                        image: imageData,

                        imageMimeType:
                            imageMimeType

                    })

                }
            );


        const data =
            await response.json();


        /* Remove typing indicator */

        if (typingMessage) {

            typingMessage.remove();

        }


        /* Check response */

        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to get AI response."
            );

        }


        /* ==========================================
           SHOW GEMINI RESPONSE
        ========================================== */

        addAIMessage(
    data.answer,
    data.products || [],
    data.recommendedProductIds || []
);


        /* Remove attachment */

        removeAttachment();


    } catch (error) {

        console.error(
            "Sutrika AI Error:",
            error
        );


        if (typingMessage) {

            typingMessage.remove();

        }


        addAIMessage(
            "I'm sorry, I couldn't connect to Sutrika AI right now. Please try again in a moment."
        );


    } finally {

        /* ==========================================
           UNLOCK CHAT
        ========================================== */

        aiIsThinking = false;


        if (sendButton) {

            sendButton.disabled = false;

            sendButton.classList.remove(
                "sending"
            );

        }


        /* Put cursor back in input */

        if (chatInput) {

            chatInput.focus();

        }

    }

}

/* ==========================================
   FILE TO BASE64
========================================== */

function fileToBase64(file) {

    return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onload = () => {

            const result = reader.result;

            const base64 = result.split(",")[1];

            resolve(base64);

        };

        reader.onerror = () => {

            reject(
                new Error("Unable to read the selected image.")
            );

        };

        reader.readAsDataURL(file);

    });

}


/* ==========================================
   USER MESSAGE
========================================== */

function addUserMessage(message) {

    const userMessage =
        document.createElement("div");

    userMessage.className =
        "user-msg";


    let imageHTML = "";


    /*
       If the user selected an image,
       show it inside the sent message.
    */

    if (
        selectedAttachment &&
        selectedAttachment.type.startsWith("image/")
    ) {

        const imageURL =
            URL.createObjectURL(
                selectedAttachment
            );


        imageHTML = `

            <img
                src="${imageURL}"
                class="sent-image"
                alt="Attached image"
            >

        `;

    }


    userMessage.innerHTML = `

        <div class="user-bubble">

            ${imageHTML}

            ${
                message
                    ? `<div>${escapeHTML(message)}</div>`
                    : ""
            }

        </div>

    `;


    chatBox.appendChild(userMessage);

    scrollChatToBottom();

}


/* ==========================================
   AI TYPING INDICATOR
========================================== */

function addTypingMessage() {

    const aiMessage = document.createElement("div");

    aiMessage.className = "ai-msg";


    aiMessage.innerHTML = `

        <div class="message-avatar">

            <img
                src="../ASSETS/LOGO/sutrika-icon-ai.png"
                alt="Sutrika Guide"
            >

        </div>


        <div class="ai-bubble typing-bubble">

            <span></span>
            <span></span>
            <span></span>

        </div>

    `;


    chatBox.appendChild(aiMessage);

    scrollChatToBottom();


    return aiMessage;

}
/* ==========================================
   AI MESSAGE + PRODUCT RECOMMENDATIONS
========================================== */

function addAIMessage(
    answer,
    products = [],
    recommendedProductIds = []
) {

    const aiMessage =
        document.createElement("div");

    aiMessage.className =
        "ai-msg";


    /* ==========================================
       FIND RECOMMENDED PRODUCTS
    ========================================== */

    const recommendedProducts =
        products.filter(product =>
            recommendedProductIds.includes(
                Number(product.id)
            )
        );


    /* ==========================================
       PRODUCT CARDS
    ========================================== */

    let productsHTML = "";

    if (recommendedProducts.length > 0) {

        productsHTML = `
            <div class="sutrika-product-section">

                <div class="sutrika-product-title">
                    <span>🛍️</span>
                    SUTRIKA PICKS
                </div>

                <div class="sutrika-product-list">

                    ${recommendedProducts.map(product => `

                        <div class="sutrika-product-card">

                            <img
                                src="${escapeHTML(product.image || "")}"
                                alt="${escapeHTML(product.product_name)}"
                                class="sutrika-product-image"
                            >

                            <div class="sutrika-product-info">

                                <h4>
                                    ${escapeHTML(product.product_name)}
                                </h4>

                                <p class="sutrika-product-category">
                                    ${escapeHTML(
                                        product.category_name || ""
                                    )}
                                </p>

                                <div class="sutrika-product-bottom">

                                    <span class="sutrika-product-price">
                                        ₹${Number(product.price).toLocaleString("en-IN")}
                                    </span>

                                    <a
                                        href="product-details.html?id=${encodeURIComponent(product.id)}"
                                        class="sutrika-view-product"
                                    >
                                        View Product
                                        <i class="fa-solid fa-arrow-right"></i>
                                    </a>

                                </div>

                            </div>

                        </div>

                    `).join("")}

                </div>

            </div>
        `;
    }


    /* ==========================================
       CREATE AI MESSAGE
    ========================================== */

    aiMessage.innerHTML = `

        <div class="message-avatar">

            <img
                src="../ASSETS/LOGO/sutrika-icon-ai.png"
                alt="Sutrika Guide"
            >

        </div>


        <div class="ai-bubble">

            ${formatAIResponse(answer)}

            ${productsHTML}

            <div class="ai-message-time">
                Sutrika Guide
            </div>

        </div>

    `;


    chatBox.appendChild(aiMessage);

    scrollChatToBottom();

}


/* ==========================================
   FORMAT AI RESPONSE
========================================== */

/* ==========================================
   FORMAT AI RESPONSE
========================================== */

function formatAIResponse(text) {

    if (!text) {
        return "";
    }


    let formatted =
        escapeHTML(text);


    /* ==========================================
       HEADINGS
       ### Heading
    ========================================== */

    formatted = formatted.replace(
        /^###\s*(.+)$/gm,
        '<div class="ai-heading">$1</div>'
    );


    /* ==========================================
       BOLD TEXT
       **text**
    ========================================== */

    formatted = formatted.replace(
        /\*\*(.*?)\*\*/g,
        '<strong>$1</strong>'
    );


    /* ==========================================
       BULLET POINTS
       * item
       - item
    ========================================== */

    formatted = formatted.replace(
        /^[\*\-]\s+(.+)$/gm,
        '<div class="ai-bullet">• $1</div>'
    );


    /* ==========================================
       NUMBERED POINTS
       1. item
    ========================================== */

    formatted = formatted.replace(
        /^(\d+)\.\s+(.+)$/gm,
        '<div class="ai-number">$1. $2</div>'
    );


    /* ==========================================
       LINE BREAKS
    ========================================== */

    formatted = formatted.replace(
        /\n\n/g,
        '<div class="ai-gap"></div>'
    );


    formatted = formatted.replace(
        /\n/g,
        '<br>'
    );


    return formatted;

}


/* ==========================================
   ESCAPE HTML
========================================== */

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* ==========================================
   SCROLL CHAT
========================================== */

function scrollChatToBottom() {

    if (!chatBox) {
        return;
    }

    setTimeout(() => {

        chatBox.scrollTop = chatBox.scrollHeight;

    }, 50);

}


/* ==========================================
   SEND BUTTON
========================================== */

if (sendButton) {

    sendButton.addEventListener(
        "click",
        askQuestion
    );

}


/* ==========================================
   ENTER TO SEND
========================================== */

if (chatInput) {

    chatInput.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                event.preventDefault();

                askQuestion();

            }

        }
    );

}

/* ==========================================
   OPEN CHAT AT LATEST MESSAGE
========================================== */

scrollChatToBottom();
/* ==========================================
   CHAT ATTACHMENT + IMAGE PREVIEW
========================================== */

const attachmentButton =
    document.querySelector("#attachmentButton");

const chatFileInput =
    document.querySelector("#chatFileInput");

const attachmentPreview =
    document.querySelector("#attachmentPreview");


let selectedAttachment = null;


if (attachmentButton && chatFileInput) {

    attachmentButton.addEventListener(
        "click",
        function () {

            chatFileInput.click();

        }
    );


    chatFileInput.addEventListener(
        "change",
        function () {

            const file = this.files[0];

            if (!file) {
                return;
            }


            selectedAttachment = file;


            showAttachmentPreview(file);


            console.log(
                "Selected file:",
                file.name
            );

        }
    );

}


/* ==========================================
   SHOW ATTACHMENT PREVIEW
========================================== */

function showAttachmentPreview(file) {

    if (!attachmentPreview) {
        return;
    }


    attachmentPreview.innerHTML = "";


    const removeButton =
        document.createElement("button");

    removeButton.type = "button";

    removeButton.className =
        "attachment-remove";

    removeButton.innerHTML =
        '<i class="fa-solid fa-xmark"></i>';


    removeButton.title =
        "Remove attachment";


    removeButton.addEventListener(
        "click",
        removeAttachment
    );


    if (file.type.startsWith("image/")) {

        const image =
            document.createElement("img");


        image.alt =
            file.name;


        const reader =
            new FileReader();


        reader.onload = function(event) {

            image.src =
                event.target.result;

        };


        reader.readAsDataURL(file);


        attachmentPreview.appendChild(image);

    } else {

        const fileIcon =
            document.createElement("div");


        fileIcon.innerHTML =
            '<i class="fa-solid fa-file" style="font-size:28px;color:#a87918;"></i>';


        attachmentPreview.appendChild(fileIcon);

    }


    const fileName =
        document.createElement("span");


    fileName.className =
        "attachment-name";


    fileName.textContent =
        file.name;


    attachmentPreview.appendChild(fileName);


    attachmentPreview.appendChild(removeButton);


    attachmentPreview.style.display =
        "flex";

}


/* ==========================================
   REMOVE ATTACHMENT
========================================== */

function removeAttachment() {

    selectedAttachment = null;


    if (chatFileInput) {

        chatFileInput.value = "";

    }


    if (attachmentPreview) {

        attachmentPreview.innerHTML = "";

        attachmentPreview.style.display =
            "none";

    }

}


});
/* ==========================================
   SUTRIKA GUIDE - PART 2
========================================== */


/* ==========================================
   SCROLL REVEAL ANIMATION
========================================== */

const revealElements = document.querySelectorAll(
".explore-card, .recommend-card, .artisan-guide-card, .faq-item, .timeline-item, .story-card"
);

const revealOnScroll = () => {

    revealElements.forEach(element => {

        const windowHeight = window.innerHeight;
        const revealTop = element.getBoundingClientRect().top;

        if(revealTop < windowHeight - 120){

            element.classList.add("show");

        }

    });

};

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();


/* ==========================================
   TYPING EFFECT
========================================== */

function typeMessage(element, text){

    element.innerHTML = "";

    let index = 0;

    const typing = setInterval(()=>{

        element.innerHTML += text.charAt(index);

        index++;

        if(index >= text.length){

            clearInterval(typing);

        }

    },25);

}


/* ==========================================
   BACK TO TOP BUTTON
========================================== */

const topButton = document.createElement("button");

topButton.innerHTML = "↑";

topButton.className = "backToTop";

document.body.appendChild(topButton);


window.addEventListener("scroll",()=>{

    if(window.scrollY > 400){

        topButton.classList.add("showTop");

    }

    else{

        topButton.classList.remove("showTop");

    }

});


topButton.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});


/* ==========================================
   BUTTON RIPPLE EFFECT
========================================== */

const buttons = document.querySelectorAll(
".btn-primary, .btn-outline"
);

buttons.forEach(button=>{

    button.addEventListener("click",function(e){

        const circle=document.createElement("span");

        const diameter=Math.max(
            this.clientWidth,
            this.clientHeight
        );

        circle.style.width=diameter+"px";
        circle.style.height=diameter+"px";

        circle.style.left=e.offsetX-diameter/2+"px";
        circle.style.top=e.offsetY-diameter/2+"px";

        circle.classList.add("ripple");

        const ripple=this.querySelector(".ripple");

        if(ripple){

            ripple.remove();

        }

        this.appendChild(circle);

    });

});
/* ==========================================
   SUTRIKA GUIDE - PART 3
========================================== */


/* ==========================================
   FAQ ACCORDION
========================================== */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item=>{

    const answer=item.querySelector("p");

    answer.style.display="none";

    item.addEventListener("click",()=>{

        const open=answer.style.display==="block";

        document.querySelectorAll(".faq-item p").forEach(p=>{

            p.style.display="none";

        });

        if(!open){

            answer.style.display="block";

        }

    });

});


/* ==========================================
   AI WELCOME POPUP
========================================== */


/* ==========================================
   GREETING BASED ON TIME
========================================== */

const heroTag=document.querySelector(".hero-tag");

if(heroTag){

    const hour=new Date().getHours();

    let greeting="Welcome";

    if(hour<12){

        greeting="🌞 Good Morning";

    }

    else if(hour<17){

        greeting="☀ Good Afternoon";

    }

    else{

        greeting="🌙 Good Evening";

    }

    heroTag.innerHTML=`${greeting} • Powered by AI • Inspired by Odisha`;

}


/* ==========================================
   RANDOM HERITAGE FACT
========================================== */

const facts=[

"Did you know? Sambalpuri Ikat is woven using a unique tie-and-dye technique.",

"Did you know? Pattachitra paintings are traditionally created using natural colours.",

"Did you know? Dhokra Art is one of the oldest metal casting techniques in India.",

"Did you know? Odisha has more than 50 traditional weaving clusters."

];

const factBox=document.createElement("div");

factBox.className="fact-box";

factBox.innerHTML=facts[Math.floor(Math.random()*facts.length)];

document.body.appendChild(factBox);

setTimeout(()=>{

    factBox.classList.add("showFact");

},1200);


/* ==========================================
   HERO IMAGE PARALLAX
========================================== */

window.addEventListener("scroll",()=>{

    const couple=document.querySelector(".guide-couple");

    if(couple){

        couple.style.transform=`translateY(${window.scrollY*0.08}px)`;

    }

});
