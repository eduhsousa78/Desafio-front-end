AOS.init();

const buttons = document.querySelectorAll('.btn-indicator');
const cards = document.querySelectorAll('.feature-card');

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.dataset.card;

        buttons.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');

        cards.forEach(card => {
            card.classList.remove('active');
            if (card.dataset.card === target) card.classList.add('active');
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const headers = document.querySelectorAll('.accordion-header');

    headers.forEach(header => {
        const contentId = header.getAttribute('aria-controls');
        const content = document.getElementById(contentId);

        if (header.getAttribute('aria-expanded') === 'true' && content) {
            content.hidden = false;
            if (!content.style.maxHeight) {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        } else if (content) {
            content.hidden = true;
            content.style.maxHeight = null;
        }

        header.addEventListener('click', () => {
            const expanded = header.getAttribute('aria-expanded') === 'true';
            document.querySelectorAll('.accordion-header').forEach(h => {
                if (h !== header) {
                    h.setAttribute('aria-expanded', 'false');
                    const otherContent = document.getElementById(h.getAttribute('aria-controls'));
                    if (otherContent) {
                        otherContent.hidden = true;
                        otherContent.style.maxHeight = null;
                        h.closest('.accordion-item').classList.remove('is-open');
                    }
                }
            });

            header.setAttribute('aria-expanded', String(!expanded));
            if (content) {
                if (expanded) {
                    content.style.maxHeight = null;
                    setTimeout(() => {
                        content.hidden = true;
                    }, 300);
                    header.closest('.accordion-item').classList.remove('is-open');
                } else {
                    content.hidden = false;
                    content.style.maxHeight = content.scrollHeight + "px";
                    header.closest('.accordion-item').classList.add('is-open');
                }
            }
        });
    });
});
const nav = document.querySelector('.main-nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 32) {
        nav.classList.add('sticky');
    } else {
        nav.classList.remove('sticky');
    }
});
const plansData = [
    {
        "id": "dev",
        "title": "DEVELOPMENT",
        "price": 10,
        "features": ["1 Module Javascript", "1 Module Human Resources"],
        "highlight": false,
        "badge_img": null
    },
    {
        "id": "it",
        "title": "IT & SOFTWARE",
        "price": 30,
        "features": ["1 Module Javascript", "1 Module Human Resources", "2 Module Sales Teams", "Pack Marketing Skills", "5 Module Study Case"],
        "highlight": true,
        "badge_img": "./assets/images/planos/Component 5.svg"
    },
    {
        "id": "business",
        "title": "BUSINESS",
        "price": 30,
        "features": ["1 Module Javascript", "1 Module Human Resources", "2 Module Sales Teams"],
        "highlight": false,
        "badge_img": null
    }
];

function generatePlans() {
    const container = document.getElementById('planos-container');
    if (!container) return;

    let htmlContent = plansData.map(plan => {
        const highlightClass = plan.highlight ? 'highlight' : '';

        const featuresHtml = plan.features.map(feature =>
            `<p class="card-text plan-feature">${feature}</p>`
        ).join('');

        
        const badgeImageHtml = plan.badge_img ?
            `<img src="${plan.badge_img}" alt="Novo Plano" class="badge-new-img">` : '';

        return `
            <div class="card text-center plan-card ${highlightClass}">
                ${badgeImageHtml} 

                <div class="card-body">
                    <div>
                        <h3 class="card-title plan-title">${plan.title}</h3>
                        <h4 class="plan-price">$${plan.price}</h4>
                        
                        <div class="mb-4"> 
                            ${featuresHtml}
                        </div>
                    </div>
                    
                    <button class="btn btn-buy-now" data-plan-id="${plan.id}">
                        Buy Now
                    </button>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = htmlContent;
}
