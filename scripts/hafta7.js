const temaButonu = document.getElementById("temaButonu");
const basvuruFormu = document.getElementById("basvuruFormu");
const sonucAlani = document.getElementById("sonucAlani");
const formTemizle = document.getElementById("formTemizle");
const formUyariAlani = document.getElementById("formUyariAlani");

const adSoyadAlani = document.getElementById("adSoyad");
const epostaAlani = document.getElementById("eposta");
const bolumAlani = document.getElementById("bolum");
const sinifAlani = document.getElementById("sinif");
const oturumAlani = document.getElementById("oturum");
const katilimTuruAlani = document.getElementById("katilimTuru");
const mesajAlani = document.getElementById("mesaj");
const onayAlani = document.getElementById("onay");

const alanlar = [
    adSoyadAlani,
    epostaAlani,
    bolumAlani,
    sinifAlani,
    oturumAlani,
    katilimTuruAlani,
    mesajAlani,
    onayAlani
];

function escapeHtml(metin) {
    return metin
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function epostaGecerliMi(eposta) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(eposta);
}

function alanGecerliliginiAyarla(alan, gecerli) {
    alan.classList.toggle("is-invalid", !gecerli);
    alan.classList.toggle("is-valid", gecerli);
}

function formUyarisiniGoster(mesaj) {
    formUyariAlani.textContent = mesaj;
    formUyariAlani.classList.remove("d-none");
}

function formUyarisiniGizle() {
    formUyariAlani.textContent = "";
    formUyariAlani.classList.add("d-none");
}

function sonucuSifirla() {
    sonucAlani.className = "alert alert-info rounded-4 shadow-sm mb-0";
    sonucAlani.textContent = "Henuz basvuru ozeti olusturulmadi. Formu doldurduktan sonra sonuc burada gorunecek.";
}

function alanDegeriniGecerliMi(alan) {
    if (alan.type === "checkbox") {
        return alan.checked;
    }

    if (alan.id === "eposta") {
        return epostaGecerliMi(alan.value.trim());
    }

    return alan.value.trim() !== "";
}

alanlar.forEach(function (alan) {
    const olayAdi = alan.type === "checkbox" || alan.tagName === "SELECT" ? "change" : "input";

    alan.addEventListener(olayAdi, function () {
        alanGecerliliginiAyarla(alan, alanDegeriniGecerliMi(alan));
    });
});

temaButonu.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");

    const koyuTemaAktif = document.body.classList.contains("dark-theme");
    document.documentElement.setAttribute("data-bs-theme", koyuTemaAktif ? "dark" : "light");
    temaButonu.textContent = koyuTemaAktif ? "Acik Temaya Gec" : "Koyu Temaya Gec";
});

basvuruFormu.addEventListener("submit", function (event) {
    event.preventDefault();

    const adSoyad = adSoyadAlani.value.trim();
    const eposta = epostaAlani.value.trim();
    const bolum = bolumAlani.value.trim();
    const sinif = sinifAlani.value;
    const oturum = oturumAlani.value;
    const katilimTuru = katilimTuruAlani.value;
    const mesaj = mesajAlani.value.trim();
    const onay = onayAlani.checked;

    const gecerliMi = {
        adSoyad: adSoyad !== "",
        eposta: epostaGecerliMi(eposta),
        bolum: bolum !== "",
        sinif: sinif !== "",
        oturum: oturum !== "",
        katilimTuru: katilimTuru !== "",
        mesaj: mesaj !== "",
        onay
    };

    alanGecerliliginiAyarla(adSoyadAlani, gecerliMi.adSoyad);
    alanGecerliliginiAyarla(epostaAlani, gecerliMi.eposta);
    alanGecerliliginiAyarla(bolumAlani, gecerliMi.bolum);
    alanGecerliliginiAyarla(sinifAlani, gecerliMi.sinif);
    alanGecerliliginiAyarla(oturumAlani, gecerliMi.oturum);
    alanGecerliliginiAyarla(katilimTuruAlani, gecerliMi.katilimTuru);
    alanGecerliliginiAyarla(mesajAlani, gecerliMi.mesaj);
    alanGecerliliginiAyarla(onayAlani, gecerliMi.onay);

    if (Object.values(gecerliMi).includes(false)) {
        formUyarisiniGoster("Lutfen zorunlu alanlari eksiksiz doldurun, gecerli e-posta girin ve onay kutusunu isaretleyin.");
        sonucAlani.className = "alert alert-danger rounded-4 shadow-sm mb-0";
        sonucAlani.innerHTML = "<strong>Uyari:</strong> Basvuru ozeti olusturulamadi. Eksik veya hatali alanlari duzeltin.";
        return;
    }

    formUyarisiniGizle();
    sonucAlani.className = "card shadow-sm border-0 rounded-4";
    sonucAlani.innerHTML = `
        <div class="card-body p-4">
            <span class="badge text-bg-success mb-3">Basvuru Alindi</span>
            <h2 class="h4 mb-3">Basvuru Ozeti</h2>
            <p class="text-secondary mb-3">Sonuc alani JavaScript ile dinamik olarak guncellendi.</p>
            <div class="row g-3">
                <div class="col-md-6"><strong>Ad Soyad:</strong> ${escapeHtml(adSoyad)}</div>
                <div class="col-md-6"><strong>E-posta:</strong> ${escapeHtml(eposta)}</div>
                <div class="col-md-6"><strong>Bolum:</strong> ${escapeHtml(bolum)}</div>
                <div class="col-md-6"><strong>Sinif:</strong> ${escapeHtml(sinif)}</div>
                <div class="col-md-6"><strong>Oturum:</strong> ${escapeHtml(oturum)}</div>
                <div class="col-md-6"><strong>Katilim Turu:</strong> ${escapeHtml(katilimTuru)}</div>
                <div class="col-12"><strong>Mesaj:</strong> ${escapeHtml(mesaj)}</div>
            </div>
            <p class="text-body-secondary small mt-3 mb-0">Form gonderimi sayfa yenilenmeden JavaScript ile islenmistir.</p>
        </div>`;
});

formTemizle.addEventListener("click", function () {
    formUyarisiniGizle();

    alanlar.forEach(function (alan) {
        alan.classList.remove("is-invalid", "is-valid");
    });

    sonucuSifirla();
});
