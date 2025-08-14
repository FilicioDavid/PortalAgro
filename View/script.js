
// MODAL E DOWNLOAD PDF

const modal = document.getElementById("resultModal");
const closeModal = document.querySelector(".close");
const downloadBtn = document.getElementById("downloadBtn");

// Fecha o modal
closeModal.onclick = () => modal.style.display = "none";
window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; };

// Download PDF
downloadBtn.onclick = () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Relatório de Insumos - Milho", 20, 20);
    doc.setFontSize(12);
    doc.text(document.getElementById("modalText").textContent, 20, 30);
    doc.save("relatorio_insumos.pdf");
};

function calculate() {
    const nPerBag = 1.0;
    const pPerBag = 0.4;
    const kPerBag = 0.8;

    const ureaTeor = 46;
    const superfosfatoTeor = 18;
    const cloretoKTeor = 60;
    const calcarioTeorCa = 20;
    const dolomitaTeorMg = 10;
    const sulfatoTeorS = 17;

    const expectedYield = parseFloat(document.getElementById('yield').value) || 0;
    const nSoil = parseFloat(document.getElementById('n').value) || 0;
    const pSoil = parseFloat(document.getElementById('p').value) || 0;
    const kSoil = parseFloat(document.getElementById('k').value) || 0;
    const caSoil = parseFloat(document.getElementById('ca').value) || 0;
    const mgSoil = parseFloat(document.getElementById('mg').value) || 0;
    const sSoil = parseFloat(document.getElementById('s').value) || 0;

    const totalN = expectedYield * nPerBag;
    const totalP = expectedYield * pPerBag;
    const totalK = expectedYield * kPerBag;

    const recommendedN = Math.max(0, totalN - nSoil);
    const recommendedP = Math.max(0, totalP - pSoil);
    const recommendedK = Math.max(0, totalK - kSoil);
    const recommendedCa = Math.max(0, 10 - caSoil);
    const recommendedMg = Math.max(0, 5 - mgSoil);
    const recommendedS = Math.max(0, 8 - sSoil);

    const ureaKgHa = (recommendedN / (ureaTeor / 100)).toFixed(1);
    const superfosfatoKgHa = (recommendedP / (superfosfatoTeor / 100)).toFixed(1);
    const cloretoKKgHa = (recommendedK / (cloretoKTeor / 100)).toFixed(1);
    const calcarioKgHa = (recommendedCa / (calcarioTeorCa / 100)).toFixed(1);
    const dolomitaKgHa = (recommendedMg / (dolomitaTeorMg / 100)).toFixed(1);
    const sulfatoKgHa = (recommendedS / (sulfatoTeorS / 100)).toFixed(1);

    const reportText = `
Recomendação de Nutrientes - Milho
----------------------------------
N: ${recommendedN.toFixed(2)} kg (${ureaKgHa} kg de ureia)
P2O5: ${recommendedP.toFixed(2)} kg (${superfosfatoKgHa} kg de superfosfato)
K2O: ${recommendedK.toFixed(2)} kg (${cloretoKKgHa} kg de cloreto de potássio)
Ca: ${recommendedCa.toFixed(2)} kg (${calcarioKgHa} kg de calcário)
Mg: ${recommendedMg.toFixed(2)} kg (${dolomitaKgHa} kg de dolomita)
S: ${recommendedS.toFixed(2)} kg (${sulfatoKgHa} kg de sulfato)
`;

    document.getElementById("modalText").textContent = reportText;
    modal.style.display = "block";
}


document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    // Login bem-sucedido
                    alert(data.message);
                    
                    // --- AQUI É O REDIRECIONAMENTO ---
                    window.location.href = '/home.html';
                    
                } else {
                    // Login falhou
                    errorMessage.textContent = data.message;
                }
            } catch (error) {
                console.error('Erro na requisição de login:', error);
                errorMessage.textContent = 'Ocorreu um erro ao tentar fazer login.';
            }
        });
    }
});