/* ==========================================================
   SUTRIKA ADMIN DASHBOARD
   ADMIN.JS
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================================
       GET LOGGED-IN ADMIN
    ====================================================== */

    const token =
        localStorage.getItem("sutrikaToken");

    const storedUser =
        JSON.parse(
            localStorage.getItem("sutrikaUser")
        );


    /* ======================================================
       ADMIN ACCESS CHECK
    ====================================================== */

    if (
        !token ||
        !storedUser ||
        storedUser.login !== true ||
        storedUser.role !== "admin"
    ) {

        alert(
            "Access denied. Administrator login required."
        );

        window.location.href =
            "admin-login.html";

        return;
    }


    /* ======================================================
       ADMIN NAME
    ====================================================== */

    const adminName =
        document.getElementById("adminName");

    const welcomeAdminName =
        document.getElementById("welcomeAdminName");


    const name =
        storedUser.name ||
        "Sutrika Admin";


    if (adminName) {

        adminName.textContent =
            name;

    }


    if (welcomeAdminName) {

        welcomeAdminName.textContent =
            name;

    }


    /* ======================================================
       DASHBOARD STATISTIC ELEMENTS
    ====================================================== */

    const totalUsers =
        document.getElementById("totalUsers");

    const totalProducts =
        document.getElementById("totalProducts");

    const totalOrders =
        document.getElementById("totalOrders");

    const totalRequests =
        document.getElementById("totalRequests");


    /* ======================================================
       LOAD DASHBOARD STATISTICS
    ====================================================== */

    async function loadDashboardStatistics() {

        try {

            const response =
                await fetch(
                    "http://localhost:5000/api/admin/dashboard",
                    {
                        method: "GET",

                        headers: {
                            "Authorization":
                                "Bearer " + token
                        }
                    }
                );


            const data =
                await response.json();


            /* ==============================================
               ACCESS DENIED
            ============================================== */

            if (
                response.status === 401 ||
                response.status === 403
            ) {

                alert(
                    data.message ||
                    "Admin access denied."
                );


                localStorage.removeItem(
                    "sutrikaToken"
                );

                localStorage.removeItem(
                    "sutrikaUser"
                );


                window.location.href =
                    "admin-login.html";

                return;
            }


            /* ==============================================
               OTHER SERVER ERROR
            ============================================== */

            if (!response.ok || !data.success) {

                throw new Error(
                    data.message ||
                    "Unable to load dashboard."
                );

            }


            /* ==============================================
               DISPLAY REAL DATABASE VALUES
            ============================================== */

            const statistics =
                data.statistics;


            if (totalUsers) {

                totalUsers.textContent =
                    statistics.users ?? 0;

            }


            if (totalProducts) {

                totalProducts.textContent =
                    statistics.products ?? 0;

            }


            if (totalOrders) {

                totalOrders.textContent =
                    statistics.orders ?? 0;

            }


            if (totalRequests) {

                totalRequests.textContent =
                    statistics.customRequests ?? 0;

            }


            console.log(
                "SUTRIKA ADMIN STATISTICS:",
                statistics
            );


        } catch (error) {

            console.error(
                "ADMIN DASHBOARD ERROR:",
                error
            );


            if (totalUsers) {
                totalUsers.textContent = "—";
            }

            if (totalProducts) {
                totalProducts.textContent = "—";
            }

            if (totalOrders) {
                totalOrders.textContent = "—";
            }

            if (totalRequests) {
                totalRequests.textContent = "—";
            }

        }

    }


    /* ======================================================
       LOAD DATA
    ====================================================== */

    loadDashboardStatistics();


    /* ======================================================
       MOBILE SIDEBAR
    ====================================================== */

    const menuToggle =
        document.getElementById(
            "adminMenuToggle"
        );

    const sidebar =
        document.querySelector(
            ".admin-sidebar"
        );


    if (menuToggle && sidebar) {

        menuToggle.addEventListener(
            "click",
            () => {

                sidebar.classList.toggle(
                    "mobile-open"
                );

            }
        );

    }


    /* ======================================================
       CLOSE MOBILE SIDEBAR WHEN CLICKING NAV
    ====================================================== */

    const navigationItems =
        document.querySelectorAll(
            ".admin-nav-item"
        );


    navigationItems.forEach(item => {

        item.addEventListener(
            "click",
            () => {

                if (
                    window.innerWidth <= 800 &&
                    sidebar
                ) {

                    sidebar.classList.remove(
                        "mobile-open"
                    );

                }

            }
        );

    });

    /* ======================================================
   USER MANAGEMENT
====================================================== */

const dashboardHome =
    document.getElementById("adminDashboardHome");

const usersSection =
    document.getElementById("adminUsersSection");

const productsSection =
    document.getElementById(
        "adminProductsSection"
    );

const ordersSection =
    document.getElementById(
        "adminOrdersSection"
    );

const requestsSection =
    document.getElementById(
        "adminRequestsSection"
    );

const requestsTableBody =
    document.getElementById(
        "adminRequestsTableBody"
    );

const requestsEmpty =
    document.getElementById(
        "adminRequestsEmpty"
    );

const requestsTotalCount =
    document.getElementById(
        "requestsTotalCount"
    );

const usersTableBody =
    document.getElementById("adminUsersTableBody");

const usersEmpty =
    document.getElementById("adminUsersEmpty");

const usersTotalCount =
    document.getElementById("usersTotalCount");

const userSearch =
    document.getElementById("adminUserSearch");

function hideAllAdminSections() {

    if (dashboardHome) {
        dashboardHome.style.display =
            "none";
    }

    if (usersSection) {
        usersSection.classList.remove(
            "visible"
        );
    }

    if (productsSection) {
        productsSection.classList.remove(
            "visible"
        );
    }

    if (ordersSection) {
        ordersSection.classList.remove(
            "visible"
        );
    }
    if (requestsSection) {
    requestsSection.classList.remove(
        "visible"
    );
}

}

let allAdminUsers = [];




/* ======================================================
   LOAD USERS
====================================================== */

async function loadAdminUsers() {

    if (!usersTableBody) {
        return;
    }

    usersTableBody.innerHTML = `
        <tr>
            <td colspan="6" class="admin-table-loading">
                <i class="fa-solid fa-spinner fa-spin"></i>
                Loading customers...
            </td>
        </tr>
    `;

    try {

        const response = await fetch(
            "http://localhost:5000/api/admin/users",
            {
                method: "GET",

                headers: {
                    "Authorization":
                        "Bearer " + token
                }
            }
        );

        const data =
            await response.json();


        if (
            response.status === 401 ||
            response.status === 403
        ) {

            alert(
                data.message ||
                "Admin access denied."
            );

            localStorage.removeItem(
                "sutrikaToken"
            );

            localStorage.removeItem(
                "sutrikaUser"
            );

            window.location.href =
                "admin-login.html";

            return;
        }


        if (!response.ok || !data.success) {

            throw new Error(
                data.message ||
                "Unable to load users."
            );

        }


        allAdminUsers =
            data.users || [];


        if (usersTotalCount) {

            usersTotalCount.textContent =
                allAdminUsers.length;

        }


        renderAdminUsers(
            allAdminUsers
        );


    } catch (error) {

        console.error(
            "ADMIN USERS ERROR:",
            error
        );

        usersTableBody.innerHTML = `
            <tr>
                <td colspan="6" class="admin-table-loading">
                    Unable to load users.
                </td>
            </tr>
        `;

    }

}


/* ======================================================
   RENDER USERS
====================================================== */

function renderAdminUsers(users) {

    if (!usersTableBody) {
        return;
    }


    if (users.length === 0) {

        usersTableBody.innerHTML = "";

        if (usersEmpty) {
            usersEmpty.classList.add("visible");
        }

        return;
    }


    if (usersEmpty) {
        usersEmpty.classList.remove("visible");
    }


    usersTableBody.innerHTML =
        users.map(user => {

            const name =
                user.full_name ||
                "Unnamed User";


            const firstLetter =
                name
                    .trim()
                    .charAt(0)
                    .toUpperCase();


            const role =
                user.role || "user";


            let joinedDate = "—";


            if (user.created_at) {

                const date =
                    new Date(
                        user.created_at
                    );

                if (!isNaN(date)) {

                    joinedDate =
                        date.toLocaleDateString(
                            "en-IN",
                            {
                                day: "2-digit",
                                month: "short",
                                year: "numeric"
                            }
                        );

                }

            }


            return `
                <tr>

                    <td>

                        <div class="admin-customer-cell">

                            <div class="admin-customer-avatar">
                                ${firstLetter}
                            </div>

                            <div>

                                <div class="admin-customer-name">
                                    ${escapeAdminHTML(name)}
                                </div>

                                <div class="admin-customer-id">
                                    ID #${escapeAdminHTML(
                                        String(user.id)
                                    )}
                                </div>

                            </div>

                        </div>

                    </td>


                    <td>
                        ${escapeAdminHTML(
                            user.email || "—"
                        )}
                    </td>


                    <td>
                        ${escapeAdminHTML(
                            user.phone || "—"
                        )}
                    </td>


                    <td>

                        <span
                            class="admin-role-badge ${
                                role === "admin"
                                    ? "admin"
                                    : "user"
                            }"
                        >
                            ${escapeAdminHTML(
                                role.toUpperCase()
                            )}
                        </span>

                    </td>

                    <td>
    ${joinedDate}
</td>

<td>
    <button
        type="button"
        class="admin-user-view"
        data-user-id="${user.id}"
    >
        <i class="fa-regular fa-eye"></i>
        View
    </button>
</td>

</tr>
            `;

        }).join("");


    attachUserViewButtons();

}


/* ======================================================
   SEARCH USERS
====================================================== */

if (userSearch) {

    userSearch.addEventListener(
        "input",
        () => {

            const searchTerm =
                userSearch.value
                    .trim()
                    .toLowerCase();


            if (!searchTerm) {

                renderAdminUsers(
                    allAdminUsers
                );

                return;
            }


            const filteredUsers =
                allAdminUsers.filter(
                    user => {

                        return (

                            String(
                                user.full_name || ""
                            )
                            .toLowerCase()
                            .includes(searchTerm)

                            ||

                            String(
                                user.email || ""
                            )
                            .toLowerCase()
                            .includes(searchTerm)

                            ||

                            String(
                                user.phone || ""
                            )
                            .toLowerCase()
                            .includes(searchTerm)

                        );

                    }
                );


            renderAdminUsers(
                filteredUsers
            );

        }
    );

}


/* ======================================================
   SHOW USERS
====================================================== */

function showAdminUsers() {

    if (!usersSection) {
        return;
    }

    hideAllAdminSections();

    usersSection.classList.add(
        "visible"
    );

    loadAdminUsers();

}


/* ======================================================
   SHOW DASHBOARD
====================================================== */

function showAdminDashboard() {

    if (!dashboardHome) {
        return;
    }

    hideAllAdminSections();

    dashboardHome.style.display =
        "block";

}


/* ======================================================
   ESCAPE HTML
====================================================== */

function escapeAdminHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* ======================================================
   VIEW USER
====================================================== */

function attachUserViewButtons() {

    const buttons =
        document.querySelectorAll(
            ".admin-user-view"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const userId =
                    button.dataset.userId;


                const user =
                    allAdminUsers.find(
                        item =>
                            String(item.id) ===
                            String(userId)
                    );


                if (!user) {
                    return;
                }


                alert(
                    "Customer:\n\n" +
                    "Name: " +
                    (user.full_name || "—") +
                    "\nEmail: " +
                    (user.email || "—") +
                    "\nPhone: " +
                    (user.phone || "—") +
                    "\nRole: " +
                    (user.role || "user")
                );

            }
        );

    });

}


/* ======================================================
   PRODUCT MANAGEMENT
====================================================== */
const productsTableBody =
    document.getElementById(
        "adminProductsTableBody"
    );

const productsEmpty =
    document.getElementById(
        "adminProductsEmpty"
    );

const productsTotalCount =
    document.getElementById(
        "productsTotalCount"
    );

const productSearch =
    document.getElementById(
        "adminProductSearch"
    );
/* ======================================================
   ORDER MANAGEMENT
====================================================== */

const ordersTableBody =
    document.getElementById(
        "adminOrdersTableBody"
    );

const ordersEmpty =
    document.getElementById(
        "adminOrdersEmpty"
    );

const ordersTotalCount =
    document.getElementById(
        "ordersTotalCount"
    );

const orderSearch =
    document.getElementById(
        "adminOrderSearch"
    );

let allAdminOrders = [];    
/* ======================================================
   ADD PRODUCT FORM
====================================================== */

const addProductBtn =
    document.getElementById(
        "adminAddProductBtn"
    );

const productForm =
    document.getElementById(
        "adminProductForm"
    );

const closeProductForm =
    document.getElementById(
        "adminCloseProductForm"
    );

const cancelProductBtn =
    document.getElementById(
        "adminCancelProductBtn"
    );

const createProductForm =
    document.getElementById(
        "adminProductCreateForm"
    );


/* ======================================================
   OPEN PRODUCT FORM
====================================================== */

function openProductForm() {

    if (!productForm) {
        return;
    }

    productForm.classList.add(
        "visible"
    );

    productForm.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* ======================================================
   CLOSE PRODUCT FORM
====================================================== */
function closeProductCreateForm() {

    if (!productForm) {
        return;
    }


    productForm.classList.remove(
        "visible"
    );


    editingProductId = null;


    const formTitle =
        productForm.querySelector(
            ".admin-product-form-header h3"
        );


    const saveButton =
        productForm.querySelector(
            ".admin-product-save-btn"
        );


    if (formTitle) {

        formTitle.textContent =
            "Add New Product";

    }


    if (saveButton) {

        saveButton.innerHTML = `
            <i class="fa-solid fa-plus"></i>
            Add Product
        `;

    }

}


/* ======================================================
   OPEN BUTTON
====================================================== */

if (addProductBtn) {

    addProductBtn.addEventListener(
        "click",
        openProductForm
    );

}


/* ======================================================
   CLOSE BUTTONS
====================================================== */

if (closeProductForm) {

    closeProductForm.addEventListener(
        "click",
        closeProductCreateForm
    );

}


if (cancelProductBtn) {

    cancelProductBtn.addEventListener(
        "click",
        closeProductCreateForm
    );

}


/* ======================================================
   CREATE PRODUCT
====================================================== */

if (createProductForm) {

    createProductForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const productName =
                document.getElementById(
                    "adminProductName"
                ).value.trim();


            const categoryId =
                document.getElementById(
                    "adminProductCategory"
                ).value;


            const price =
                document.getElementById(
                    "adminProductPrice"
                ).value;


            const stock =
                document.getElementById(
                    "adminProductStock"
                ).value;


            const image =
                document.getElementById(
                    "adminProductImage"
                ).value.trim();


            const artisanName =
                document.getElementById(
                    "adminProductArtisan"
                ).value.trim();


            const description =
                document.getElementById(
                    "adminProductDescription"
                ).value.trim();


            const saveButton =
                createProductForm.querySelector(
                    ".admin-product-save-btn"
                );


            const originalButtonHTML =
                saveButton.innerHTML;


            saveButton.disabled = true;

            saveButton.innerHTML = `
                <i class="fa-solid fa-spinner fa-spin"></i>
                Adding...
            `;


            try {

                const isEditing =
    editingProductId !== null;


const requestUrl =
    isEditing
        ? `http://localhost:5000/api/admin/products/${editingProductId}`
        : "http://localhost:5000/api/admin/products";


const requestMethod =
    isEditing
        ? "PUT"
        : "POST";


const response =
    await fetch(
        requestUrl,
        {
            method:
                requestMethod,

            headers: {

                "Content-Type":
                    "application/json",

                "Authorization":
                    "Bearer " +
                    localStorage.getItem(
                        "sutrikaToken"
                    )

            },

            body: JSON.stringify({

                product_name:
                    productName,

                category_id:
                    Number(categoryId),

                price:
                    Number(price),

                stock:
                    Number(stock || 0),

                image:
                    image || null,

                description:
                    description || null,

                artisan_name:
                    artisanName || null

            })

        }
    );

                

                        


                const data =
                    await response.json();


                if (
                    response.status === 401 ||
                    response.status === 403
                ) {

                    alert(
                        data.message ||
                        "Admin access denied."
                    );

                    return;

                }


                if (
                    !response.ok ||
                    !data.success
                ) {

                    throw new Error(
                        data.message ||
                        "Unable to add product."
                    );

                }

                if (isEditing) {

    alert(
        "Product updated successfully!"
    );

} else {

    alert(
        "Product added successfully!"
    );

}createProductForm.reset();

editingProductId = null;

const formTitle =
    productForm.querySelector(
        ".admin-product-form-header h3"
    );


const saveButton =
    productForm.querySelector(
        ".admin-product-save-btn"
    );


if (formTitle) {

    formTitle.textContent =
        "Add New Product";

}


if (saveButton) {

    saveButton.innerHTML = `
        <i class="fa-solid fa-plus"></i>
        Add Product
    `;

}


closeProductCreateForm();

await loadAdminProducts();



            } catch (error) {

                console.error(
                    "ADD PRODUCT ERROR:",
                    error
                );


                alert(
                    error.message ||
                    "Unable to add product."
                );


            } finally {

                saveButton.disabled =
                    false;

                saveButton.innerHTML =
                    originalButtonHTML;

            }

        }
    );

}

let allAdminProducts = [];
let editingProductId = null;


/* ======================================================
   LOAD PRODUCTS
====================================================== */

async function loadAdminProducts() {

    if (!productsTableBody) {
        return;
    }


    productsTableBody.innerHTML = `
        <tr>

            <td
                colspan="6"
                class="admin-table-loading"
            >

                <i class="fa-solid fa-spinner fa-spin"></i>

                Loading products...

            </td>

        </tr>
    `;


    try {

        const response =
            await fetch(
                "http://localhost:5000/api/product"
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                "Unable to load products."
            );

        }


        /*
            Your existing Product API returns
            the product array directly.
        */

        allAdminProducts =
            Array.isArray(data)
                ? data
                : (
                    data.products ||
                    []
                );


        if (productsTotalCount) {

            productsTotalCount.textContent =
                allAdminProducts.length;

        }


        renderAdminProducts(
            allAdminProducts
        );


    } catch (error) {

        console.error(
            "ADMIN PRODUCTS ERROR:",
            error
        );


        productsTableBody.innerHTML = `
            <tr>

                <td
                    colspan="6"
                    class="admin-table-loading"
                >

                    Unable to load products.

                </td>

            </tr>
        `;

    }

}


/* ======================================================
   RENDER PRODUCTS
====================================================== */

function renderAdminProducts(products) {

    if (!productsTableBody) {
        return;
    }


    if (products.length === 0) {

        productsTableBody.innerHTML = "";


        if (productsEmpty) {

            productsEmpty.classList.add(
                "visible"
            );

        }

        return;
    }


    if (productsEmpty) {

        productsEmpty.classList.remove(
            "visible"
        );

    }


    productsTableBody.innerHTML =
        products.map(product => {

            const name =
                product.product_name ||
                "Unnamed Product";


            const category =
                product.category_name ||
                "Uncategorized";


            const price =
                Number(
                    product.price || 0
                );


            const stock =
                Number(
                    product.stock || 0
                );


            let status =
                "IN STOCK";


            let statusClass =
                "product-in-stock";


            if (stock <= 0) {

                status =
                    "OUT OF STOCK";

                statusClass =
                    "product-out-stock";

            }
            else if (stock <= 5) {

                status =
                    "LOW STOCK";

                statusClass =
                    "product-low-stock";

            }


            return `
                <tr>


                    <td>

                        <div class="admin-product-cell">

                            <div class="admin-product-icon">

                                <i class="fa-solid fa-box-open"></i>

                            </div>


                            <div>

                                <div class="admin-product-name">

                                    ${escapeAdminHTML(
                                        name
                                    )}

                                </div>


                                <div class="admin-customer-id">

                                    Product ID #${escapeAdminHTML(
                                        String(product.id)
                                    )}

                                </div>

                            </div>

                        </div>

                    </td>


                    <td>

                        ${escapeAdminHTML(
                            category
                        )}

                    </td>


                    <td>

                        ₹${price.toLocaleString(
                            "en-IN",
                            {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            }
                        )}

                    </td>


                    <td>

                        ${stock}

                    </td>


                    <td>

                        <span
                            class="admin-product-status ${statusClass}"
                        >

                            ${status}

                        </span>

                    </td>

                    <td>

    <div class="admin-product-actions">

        <button
            type="button"
            class="admin-product-view"
            data-product-id="${product.id}"
        >
            <i class="fa-regular fa-eye"></i>
            View
        </button>


        <button
            type="button"
            class="admin-product-edit"
            data-product-id="${product.id}"
        >
            <i class="fa-solid fa-pen"></i>
            Edit
        </button>

        <button
    type="button"
    class="admin-product-delete"
    data-product-id="${product.id}"
>
    <i class="fa-solid fa-trash"></i>
    Delete
</button>

    </div>

</td>




                </tr>
            `;

        }).join("");


    attachProductViewButtons();

    attachProductEditButtons();

    attachProductDeleteButtons();

}


/* ======================================================
   PRODUCT SEARCH
====================================================== */

if (productSearch) {

    productSearch.addEventListener(
        "input",
        () => {

            const searchTerm =
                productSearch.value
                    .trim()
                    .toLowerCase();


            if (!searchTerm) {

                renderAdminProducts(
                    allAdminProducts
                );

                return;

            }


            const filteredProducts =
                allAdminProducts.filter(
                    product => {

                        return (

                            String(
                                product.product_name || ""
                            )
                            .toLowerCase()
                            .includes(searchTerm)

                            ||

                            String(
                                product.category_name || ""
                            )
                            .toLowerCase()
                            .includes(searchTerm)

                        );

                    }
                );


            renderAdminProducts(
                filteredProducts
            );

        }
    );

}


/* ======================================================
   SHOW PRODUCTS
====================================================== */

function showAdminProducts() {

    if (!productsSection) {
        return;
    }

    hideAllAdminSections();

    productsSection.classList.add(
        "visible"
    );

    loadAdminProducts();

}

/* ======================================================
   LOAD ORDERS
====================================================== */

async function loadAdminOrders() {

    if (!ordersTableBody) {
        return;
    }

    ordersTableBody.innerHTML = `
        <tr>
            <td colspan="7" class="admin-table-loading">
                <i class="fa-solid fa-spinner fa-spin"></i>
                Loading orders...
            </td>
        </tr>
    `;

    try {

        const response =
            await fetch(
                "http://localhost:5000/api/order",
                {
                    method: "GET",

                    headers: {
                        "Authorization":
                            "Bearer " +
                            localStorage.getItem(
                                "sutrikaToken"
                            )
                    }
                }
            );


        const data =
            await response.json();


        if (
            response.status === 401 ||
            response.status === 403
        ) {

            alert(
                data.message ||
                "Admin access denied."
            );

            return;
        }


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Unable to load orders."
            );

        }


        /*
            Your Order API returns
            the order array directly.
        */

        allAdminOrders =
            Array.isArray(data)
                ? data
                : (
                    data.orders ||
                    []
                );


        if (ordersTotalCount) {

            ordersTotalCount.textContent =
                allAdminOrders.length;

        }


        renderAdminOrders(
            allAdminOrders
        );


    } catch (error) {

        console.error(
            "ADMIN ORDERS ERROR:",
            error
        );


        ordersTableBody.innerHTML = `
            <tr>
                <td colspan="7" class="admin-table-loading">
                    Unable to load orders.
                </td>
            </tr>
        `;

    }

}


/* ======================================================
   RENDER ORDERS
====================================================== */

function renderAdminOrders(orders) {

    if (!ordersTableBody) {
        return;
    }


    if (orders.length === 0) {

        ordersTableBody.innerHTML = "";

        if (ordersEmpty) {
            ordersEmpty.classList.add(
                "visible"
            );
        }

        return;
    }


    if (ordersEmpty) {

        ordersEmpty.classList.remove(
            "visible"
        );

    }


    ordersTableBody.innerHTML =
        orders.map(order => {

            const customer =
                order.full_name ||
                "Unknown Customer";


            const email =
                order.email ||
                "—";


            const total =
                Number(
                    order.total_amount || 0
                );


            const status =
                order.status ||
                "Pending";


            let statusClass =
                status
                    .toLowerCase()
                    .replace(
                        /\s+/g,
                        "-"
                    );


            let orderDate = "—";


            if (order.created_at) {

                const date =
                    new Date(
                        order.created_at
                    );


                if (!isNaN(date)) {

                    orderDate =
                        date.toLocaleDateString(
                            "en-IN",
                            {
                                day: "2-digit",
                                month: "short",
                                year: "numeric"
                            }
                        );

                }

            }


            return `
                <tr>

                    <td>
                        <strong>
                            #${escapeAdminHTML(
                                String(order.id)
                            )}
                        </strong>
                    </td>


                    <td>

                        <div class="admin-customer-cell">

                            <div class="admin-customer-avatar">
                                ${escapeAdminHTML(
                                    customer
                                        .charAt(0)
                                        .toUpperCase()
                                )}
                            </div>

                            <div>

                                <div class="admin-customer-name">
                                    ${escapeAdminHTML(
                                        customer
                                    )}
                                </div>

                            </div>

                        </div>

                    </td>


                    <td>
                        ${escapeAdminHTML(
                            email
                        )}
                    </td>


                    <td>
                        ₹${total.toLocaleString(
                            "en-IN",
                            {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            }
                        )}
                    </td>


                    <td>

                        <span
                            class="admin-order-status ${escapeAdminHTML(
                                statusClass
                            )}"
                        >
                            ${escapeAdminHTML(
                                status
                            )}
                        </span>

                    </td>


                    <td>
                        ${escapeAdminHTML(
                            orderDate
                        )}
                    </td>


                    <td>

                        <button
                            type="button"
                            class="admin-order-view"
                            data-order-id="${order.id}"
                        >
                            <i class="fa-regular fa-eye"></i>
                            View
                        </button>

                    </td>

                </tr>
            `;

        }).join("");


    attachOrderViewButtons();

}


/* ======================================================
   SEARCH ORDERS
====================================================== */

if (orderSearch) {

    orderSearch.addEventListener(
        "input",
        () => {

            const searchTerm =
                orderSearch.value
                    .trim()
                    .toLowerCase();


            if (!searchTerm) {

                renderAdminOrders(
                    allAdminOrders
                );

                return;
            }


            const filteredOrders =
                allAdminOrders.filter(
                    order => {

                        return (

                            String(
                                order.id || ""
                            )
                            .toLowerCase()
                            .includes(
                                searchTerm
                            )

                            ||

                            String(
                                order.full_name || ""
                            )
                            .toLowerCase()
                            .includes(
                                searchTerm
                            )

                            ||

                            String(
                                order.email || ""
                            )
                            .toLowerCase()
                            .includes(
                                searchTerm
                            )

                        );

                    }
                );


            renderAdminOrders(
                filteredOrders
            );

        }
    );

}


/* ======================================================
   SHOW ORDERS
====================================================== */

function showAdminOrders() {

    if (
        !dashboardHome ||
        !usersSection ||
        !productsSection ||
        !ordersSection
    ) {
        return;
    }


    dashboardHome.style.display =
        "none";


    usersSection.classList.remove(
        "visible"
    );


    productsSection.classList.remove(
        "visible"
    );


    ordersSection.classList.add(
        "visible"
    );


    loadAdminOrders();

}

/* ======================================================
   SHOW CUSTOM REQUESTS
====================================================== */

function showAdminCustomRequests() {

    if (!requestsSection) {
        return;
    }

    hideAllAdminSections();

    requestsSection.classList.add(
        "visible"
    );

    loadAdminCustomRequests();

}


/* ======================================================
   LOAD CUSTOM REQUESTS
====================================================== */

async function loadAdminCustomRequests() {

    if (!requestsTableBody) {
        return;
    }

    requestsTableBody.innerHTML = `
        <tr>
            <td colspan="8" class="admin-table-loading">
                <i class="fa-solid fa-spinner fa-spin"></i>
                Loading custom requests...
            </td>
        </tr>
    `;

    try {

        const response =
            await fetch(
                "http://localhost:5000/api/admin/custom-requests",
                {
                    method: "GET",

                    headers: {
                        "Authorization":
                            "Bearer " +
                            localStorage.getItem(
                                "sutrikaToken"
                            )
                    }
                }
            );

        const data =
            await response.json();

        if (
            response.status === 401 ||
            response.status === 403
        ) {

            alert(
                data.message ||
                "Admin access denied."
            );

            return;
        }

        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to load custom requests."
            );

        }

        const requests =
            data.requests || [];

        window.adminCustomRequests = requests;

        console.log(
            "ADMIN CUSTOM REQUESTS:",
            requests
        );

        if (requestsTotalCount) {

            requestsTotalCount.textContent =
                requests.length;

        }

        if (requests.length === 0) {

            requestsTableBody.innerHTML = "";

            if (requestsEmpty) {

                requestsEmpty.classList.add(
                    "visible"
                );

            }

            return;
        }

        if (requestsEmpty) {

            requestsEmpty.classList.remove(
                "visible"
            );

        }

        requestsTableBody.innerHTML =
            requests.map(request => {

                let requestDate = "—";

                if (request.created_at) {

                    const date =
                        new Date(
                            request.created_at
                        );

                    if (!isNaN(date)) {

                        requestDate =
                            date.toLocaleDateString(
                                "en-IN",
                                {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric"
                                }
                            );

                    }

                }

                return `
                    <tr>

                        <td>
                            <strong>
                                ${escapeAdminHTML(
                                    request.request_id || "—"
                                )}
                            </strong>
                        </td>

                        <td>
                            <strong>
                                ${escapeAdminHTML(
                                    request.full_name || "—"
                                )}
                            </strong>

                            <small>
                                ${escapeAdminHTML(
                                    request.email || ""
                                )}
                            </small>
                        </td>

                        <td>
                            ${escapeAdminHTML(
                                request.fabric || "—"
                            )}
                        </td>

                        <td>
                            ${escapeAdminHTML(
                                request.colour || "—"
                            )}
                        </td>

                        <td>
                            ${escapeAdminHTML(
                                request.occasion || "—"
                            )}
                        </td>

                        <td>

                            <span class="admin-request-status">
                                ${escapeAdminHTML(
                                    request.status || "Pending"
                                )}
                            </span>

                        </td>

                        <td>
                            ${requestDate}
                        </td>

                        <td>

                            <button
                                type="button"
                                class="admin-request-view"
                                data-request-id="${request.id}"
                            >

                                <i class="fa-regular fa-eye"></i>

                                View

                            </button>

                        </td>

                    </tr>
                `;

            }).join("");

attachCustomRequestViewButtons();

} catch (error) {

        console.error(
            "ADMIN CUSTOM REQUESTS ERROR:",
            error
        );

        requestsTableBody.innerHTML = `
            <tr>
                <td colspan="8" class="admin-table-loading">
                    Unable to load custom requests.
                </td>
            </tr>
        `;

    }

}

/* ======================================================
   CUSTOM REQUEST VIEW BUTTONS
====================================================== */

function attachCustomRequestViewButtons() {

    const buttons =
        document.querySelectorAll(
            ".admin-request-view"
        );

    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const requestId =
                    button.dataset.requestId;

                viewAdminCustomRequest(
                    requestId
                );

            }
        );

    });

}


/* ======================================================
   VIEW CUSTOM REQUEST
====================================================== */

function viewAdminCustomRequest(requestId) {

    const request =
        window.adminCustomRequests?.find(
            item => Number(item.id) === Number(requestId)
        );

    if (!request) {

        alert(
            "Unable to find this custom request."
        );

        return;
    }

    alert(
        "CUSTOM REQUEST DETAILS\n\n" +

        "Request ID: " +
        (request.request_id || "—") +

        "\n\nCustomer: " +
        (request.full_name || "—") +

        "\nEmail: " +
        (request.email || "—") +

        "\n\nFabric: " +
        (request.fabric || "—") +

        "\nColour: " +
        (request.colour || "—") +

        "\nPattern: " +
        (request.pattern || "—") +

        "\nOccasion: " +
        (request.occasion || "—") +

        "\n\nSpecial Request:\n" +
        (request.special_request || "No special request") +

        "\n\nStatus: " +
        (request.status || "Pending")
    );

}

/* ======================================================
   VIEW ORDER
====================================================== */

/*function attachOrderViewButtons() {

    const buttons =
        document.querySelectorAll(
            ".admin-order-view"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const orderId =
                    button.dataset.orderId;


                const order =
                    allAdminOrders.find(
                        item =>
                            String(item.id) ===
                            String(orderId)
                    );


                if (!order) {
                    return;
                }


                alert(
                    "Order Details:\n\n" +

                    "Order ID: #" +
                    (order.id || "—") +

                    "\nCustomer: " +
                    (order.full_name || "—") +

                    "\nEmail: " +
                    (order.email || "—") +

                    "\nTotal: ₹" +
                    (order.total_amount || "0") +

                    "\nStatus: " +
                    (order.status || "Pending")
                );

            }
        );

    });

}*/

/* ======================================================
   ORDER VIEW BUTTONS
====================================================== */

function attachOrderViewButtons() {

    const buttons =
        document.querySelectorAll(
            ".admin-order-view"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const orderId =
                    button.dataset.orderId;


                const order =
                    allAdminOrders.find(
                        item =>
                            String(item.id) ===
                            String(orderId)
                    );


                if (!order) {

                    return;

                }


                showOrderDetailsModal(
                    order
                );

            }
        );

    });

}


/* ======================================================
   ORDER DETAILS MODAL
====================================================== */

function showOrderDetailsModal(order) {

    const existingModal =
        document.getElementById(
            "adminOrderDetailsModal"
        );


    if (existingModal) {

        existingModal.remove();

    }


    const customer =
        order.full_name ||
        "Unknown Customer";


    const email =
        order.email ||
        "—";


    const total =
        Number(
            order.total_amount || 0
        );


    const status =
        order.status ||
        "Pending";


    let orderDate =
        "—";


    if (order.created_at) {

        const date =
            new Date(
                order.created_at
            );


        if (!isNaN(date)) {

            orderDate =
                date.toLocaleDateString(
                    "en-IN",
                    {
                        day: "2-digit",
                        month: "long",
                        year: "numeric"
                    }
                );

        }

    }


    const modal =
        document.createElement(
            "div"
        );


    modal.id =
        "adminOrderDetailsModal";


    modal.className =
        "admin-order-modal";


    modal.innerHTML = `

        <div
            class="admin-order-modal-overlay"
            data-close-order-modal="true"
        ></div>


        <div
            class="admin-order-modal-card"
        >

            <div
                class="admin-order-modal-header"
            >

                <div>

                    <span>
                        ORDER DETAILS
                    </span>

                    <h3>
                        Order #${escapeAdminHTML(
                            String(order.id)
                        )}
                    </h3>

                </div>


                <button
                    type="button"
                    class="admin-order-modal-close"
                    id="adminOrderModalClose"
                >

                    <i
                        class="fa-solid fa-xmark"
                    ></i>

                </button>

            </div>


            <div
                class="admin-order-modal-body"
            >

                <div
                    class="admin-order-detail-item"
                >

                    <span>
                        CUSTOMER
                    </span>

                    <strong>
                        ${escapeAdminHTML(
                            customer
                        )}
                    </strong>

                </div>


                <div
                    class="admin-order-detail-item"
                >

                    <span>
                        EMAIL
                    </span>

                    <strong>
                        ${escapeAdminHTML(
                            email
                        )}
                    </strong>

                </div>


                <div
                    class="admin-order-detail-item"
                >

                    <span>
                        ORDER DATE
                    </span>

                    <strong>
                        ${escapeAdminHTML(
                            orderDate
                        )}
                    </strong>

                </div>


                <div
                    class="admin-order-detail-item"
                >

                    <span>
                        TOTAL AMOUNT
                    </span>

                    <strong class="admin-order-total">
                        ₹${total.toLocaleString(
                            "en-IN",
                            {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            }
                        )}
                    </strong>

                </div>


                <div
    class="admin-order-detail-item admin-order-status-control"
>

    <span>
        ORDER STATUS
    </span>

    <select
        id="adminOrderStatusSelect"
        class="admin-order-status-select"
    >

        <option
            value="Pending"
            ${status === "Pending" ? "selected" : ""}
        >
            Pending
        </option>

        <option
            value="Confirmed"
            ${status === "Confirmed" ? "selected" : ""}
        >
            Confirmed
        </option>

        <option
            value="Shipped"
            ${status === "Shipped" ? "selected" : ""}
        >
            Shipped
        </option>

        <option
            value="Delivered"
            ${status === "Delivered" ? "selected" : ""}
        >
            Delivered
        </option>

        <option
            value="Cancelled"
            ${status === "Cancelled" ? "selected" : ""}
        >
            Cancelled
        </option>

    </select>

</div>
            </div>


            <div
    class="admin-order-modal-footer"
>

    <button
        type="button"
        id="adminOrderUpdateStatus"
        class="admin-order-update-btn"
    >
        <i class="fa-solid fa-rotate"></i>
        Update Status
    </button>


    <button
        type="button"
        id="adminOrderModalCloseBottom"
        class="admin-order-modal-close-btn"
    >
        Close
    </button>

</div>
        </div>

    `;


    document.body.appendChild(
        modal
    );


    requestAnimationFrame(
        () => {

            modal.classList.add(
                "visible"
            );

        }
    );

    const updateStatusButton =
    document.getElementById(
        "adminOrderUpdateStatus"
    );


const statusSelect =
    document.getElementById(
        "adminOrderStatusSelect"
    );


if (
    updateStatusButton &&
    statusSelect
) {

    updateStatusButton.addEventListener(
        "click",
        async () => {

            const newStatus =
                statusSelect.value;


            if (!newStatus) {

                return;

            }


            updateStatusButton.disabled =
                true;


            updateStatusButton.innerHTML = `
                <i class="fa-solid fa-spinner fa-spin"></i>
                Updating...
            `;


            try {

                const response =
                    await fetch(
                        `http://localhost:5000/api/order/${order.id}`,
                        {
                            method: "PATCH",

                            headers: {

                                "Content-Type":
                                    "application/json",

                                "Authorization":
                                    "Bearer " +
                                    localStorage.getItem(
                                        "sutrikaToken"
                                    )

                            },

                            body: JSON.stringify({

                                status:
                                    newStatus

                            })

                        }
                    );


                const data =
                    await response.json();


                if (
                    response.status === 401 ||
                    response.status === 403
                ) {

                    throw new Error(
                        data.message ||
                        "Admin access denied."
                    );

                }


                if (
                    !response.ok ||
                    !data.success
                ) {

                    throw new Error(
                        data.message ||
                        "Unable to update order status."
                    );

                }


                /* ======================================
                   UPDATE LOCAL ORDER DATA
                ====================================== */

                order.status =
                    newStatus;


                const existingOrder =
                    allAdminOrders.find(
                        item =>
                            String(item.id) ===
                            String(order.id)
                    );


                if (existingOrder) {

                    existingOrder.status =
                        newStatus;

                }


                /* ======================================
                   REFRESH TABLE
                ====================================== */

                renderAdminOrders(
                    allAdminOrders
                );


                alert(
                    "Order status updated successfully!"
                );


                closeModal();


            } catch (error) {

                console.error(
                    "UPDATE ORDER STATUS ERROR:",
                    error
                );


                alert(
                    error.message ||
                    "Unable to update order status."
                );


                updateStatusButton.disabled =
                    false;


                updateStatusButton.innerHTML = `
                    <i class="fa-solid fa-rotate"></i>
                    Update Status
                `;

            }

        }
    );

}


    const closeModal = () => {

        modal.classList.remove(
            "visible"
        );


        setTimeout(
            () => {

                modal.remove();

            },
            250
        );

    };


    const closeButton =
        document.getElementById(
            "adminOrderModalClose"
        );


    const closeBottomButton =
        document.getElementById(
            "adminOrderModalCloseBottom"
        );


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeModal
        );

    }


    if (closeBottomButton) {

        closeBottomButton.addEventListener(
            "click",
            closeModal
        );

    }


    const overlay =
        modal.querySelector(
            "[data-close-order-modal='true']"
        );


    if (overlay) {

        overlay.addEventListener(
            "click",
            closeModal
        );

    }


    document.addEventListener(
        "keydown",
        function escapeHandler(event) {

            if (
                event.key === "Escape"
            ) {

                closeModal();

                document.removeEventListener(
                    "keydown",
                    escapeHandler
                );

            }

        }
    );

}


/* ======================================================
   VIEW PRODUCT
====================================================== */

function attachProductViewButtons() {

    const buttons =
        document.querySelectorAll(
            ".admin-product-view"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const productId =
                    button.dataset.productId;


                const product =
                    allAdminProducts.find(
                        item =>
                            String(item.id) ===
                            String(productId)
                    );


                if (!product) {
                    return;
                }


                alert(
                    "Product:\n\n" +
                    "Name: " +
                    (
                        product.product_name ||
                        "—"
                    ) +
                    "\nCategory: " +
                    (
                        product.category_name ||
                        "—"
                    ) +
                    "\nPrice: ₹" +
                    (
                        product.price ||
                        "0"
                    ) +
                    "\nStock: " +
                    (
                        product.stock ||
                        "0"
                    )
                );

            }
        );

    });

}

/* ======================================================
   EDIT PRODUCT BUTTONS
====================================================== */

function attachProductEditButtons() {

    const buttons =
        document.querySelectorAll(
            ".admin-product-edit"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const productId =
                    button.dataset.productId;


                const product =
                    allAdminProducts.find(
                        item =>
                            String(item.id) ===
                            String(productId)
                    );


                if (!product) {

                    console.error(
                        "Product not found:",
                        productId
                    );

                    return;

                }


                openEditProductForm(
                    product
                );

            }
        );

    });

}

/* ======================================================
   DELETE PRODUCT BUTTONS
====================================================== */

function attachProductDeleteButtons() {

    const buttons =
        document.querySelectorAll(
            ".admin-product-delete"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            async () => {

                const productId =
                    button.dataset.productId;


                const product =
                    allAdminProducts.find(
                        item =>
                            String(item.id) ===
                            String(productId)
                    );


                if (!product) {

                    return;

                }


                const confirmed =
                    confirm(
                        `Are you sure you want to delete "${product.product_name}"?\n\nThis action cannot be undone.`
                    );


                if (!confirmed) {

                    return;

                }


                button.disabled = true;


                button.innerHTML = `
                    <i class="fa-solid fa-spinner fa-spin"></i>
                    Deleting...
                `;


                try {

                    const response =
                        await fetch(
                            `http://localhost:5000/api/admin/products/${productId}`,
                            {
                                method: "DELETE",

                                headers: {
                                    "Authorization":
                                        "Bearer " +
                                        localStorage.getItem(
                                            "sutrikaToken"
                                        )
                                }
                            }
                        );


                    const data =
                        await response.json();


                    if (
                        response.status === 401 ||
                        response.status === 403
                    ) {

                        alert(
                            data.message ||
                            "Admin access denied."
                        );

                        return;

                    }


                    if (!response.ok ||
                        !data.success) {

                        throw new Error(
                            data.message ||
                            "Unable to delete product."
                        );

                    }


                    alert(
                        "Product deleted successfully!"
                    );


                    await loadAdminProducts();


                } catch (error) {

                    console.error(
                        "DELETE PRODUCT ERROR:",
                        error
                    );


                    alert(
                        error.message ||
                        "Unable to delete product."
                    );


                    button.disabled = false;


                    button.innerHTML = `
                        <i class="fa-solid fa-trash"></i>
                        Delete
                    `;

                }

            }
        );

    });

}



/* ======================================================
   OPEN EDIT PRODUCT FORM
====================================================== */

function openEditProductForm(product) {

    editingProductId =
        product.id;


    const productForm =
        document.getElementById(
            "adminProductForm"
        );


    const formTitle =
        productForm.querySelector(
            ".admin-product-form-header h3"
        );


    const saveButton =
        productForm.querySelector(
            ".admin-product-save-btn"
        );


    /* ==========================================
       CHANGE FORM TITLE
    ========================================== */

    if (formTitle) {

        formTitle.textContent =
            "Edit Product";

    }


    /* ==========================================
       CHANGE BUTTON
    ========================================== */

    if (saveButton) {

        saveButton.innerHTML = `
            <i class="fa-solid fa-pen"></i>
            Update Product
        `;

    }


    /* ==========================================
       FILL EXISTING DATA
    ========================================== */

    document.getElementById(
        "adminProductName"
    ).value =
        product.product_name || "";


    document.getElementById(
        "adminProductCategory"
    ).value =
        product.category_id || "";


    document.getElementById(
        "adminProductPrice"
    ).value =
        product.price || "";


    document.getElementById(
        "adminProductStock"
    ).value =
        product.stock ?? 0;


    document.getElementById(
        "adminProductImage"
    ).value =
        product.image || "";


    document.getElementById(
        "adminProductArtisan"
    ).value =
        product.artisan_name || "";


    document.getElementById(
        "adminProductDescription"
    ).value =
        product.description || "";


    /* ==========================================
       SHOW FORM
    ========================================== */

    productForm.classList.add(
        "visible"
    );


    productForm.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}

/* ======================================================
   QUICK ACTION BUTTONS
====================================================== */

const actionButtons =
    document.querySelectorAll(
        ".admin-action-card"
    );


actionButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const section =
                button.dataset.section;


            if (!section) {
                return;
            }


            if (section === "users") {

                showAdminUsers();

                return;
            }

            if (section === "products") {

                showAdminProducts();

                return;
            }

            if (section === "orders") {

    showAdminOrders();

    return;
}

if (section === "custom-requests") {

    showAdminCustomRequests();

    return;
}


            alert(
                section.charAt(0).toUpperCase() +
                section.slice(1) +
                " management will be added next."
            );

        }
    );

});



    /* ======================================================
   SIDEBAR NAVIGATION
====================================================== */

const sectionLinks =
    document.querySelectorAll(
        ".admin-navigation .admin-nav-item"
    );


sectionLinks.forEach(link => {

    link.addEventListener(
        "click",
        event => {

            event.preventDefault();


            sectionLinks.forEach(
                navItem => {

                    navItem.classList.remove(
                        "active"
                    );

                }
            );


            link.classList.add(
                "active"
            );


            const section =
                link.dataset.section;


            if (section === "users") {

                showAdminUsers();

                return;
            }

            if (section === "products") {

               showAdminProducts();

               return;
            }

            if (section === "orders") {

    showAdminOrders();

    return;
}
if (section === "custom-requests") {

    showAdminCustomRequests();

    return;
}

            if (section === "dashboard") {

                showAdminDashboard();

                return;
            }


            if (section) {

                alert(
                    section.charAt(0).toUpperCase() +
                    section.slice(1) +
                    " management will be added next."
                );

            }

        }
    );

});


    /* ======================================================
       ADMIN LOGOUT
    ====================================================== */

    const logoutButton =
        document.getElementById(
            "adminLogoutBtn"
        );


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            () => {

                const confirmLogout =
                    confirm(
                        "Are you sure you want to logout?"
                    );


                if (!confirmLogout) {
                    return;
                }


                localStorage.removeItem(
                    "sutrikaToken"
                );

                localStorage.removeItem(
                    "sutrikaUser"
                );


                window.location.href =
    "../HTML/account.html?login=true";

            }
        );

    }


    /* ======================================================
       HANDLE WINDOW RESIZE
    ====================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 800 &&
                sidebar
            ) {

                sidebar.classList.remove(
                    "mobile-open"
                );

            }

        }
    );

});


document.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(
                ".admin-request-view"
            );

        if (!button) {
            return;
        }

        const requestId =
            button.getAttribute(
                "data-request-id"
            );

        viewAdminCustomRequest(
            requestId
        );

    }
);