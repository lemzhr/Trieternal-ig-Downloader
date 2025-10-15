document.addEventListener("DOMContentLoaded", function () {
    const downloadForm = document.getElementById("downloadForm");
    const urlInput = document.getElementById("url-input");
    const pasteBtn = document.getElementById("paste-btn");
    const resultDiv = document.getElementById("result");
    const downloadBtn = document.getElementById("download-btn");

    if (!downloadForm || !urlInput || !resultDiv || !downloadBtn) {
        console.error("Elemen penting tidak ditemukan di halaman!");
        return;
    }

    function showMessage(message, isError = false) {
        resultDiv.innerHTML = `<p class="${isError ? 'error-msg' : 'success-msg'}">${message}</p>`;
    }

    downloadForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const url = urlInput.value.trim();
        if (url === "" || !url.includes("instagram.com")) {
            showMessage("Silakan masukkan URL Instagram yang valid!", true);
            return;
        }

        resultDiv.innerHTML = '';
        downloadBtn.disabled = true;
        downloadBtn.classList.add('loading');

        fetch("/download", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: url })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Server merespons dengan status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                resultDiv.innerHTML = `
                    <p>Berhasil! Klik tombol di bawah untuk mengunduh.</p>
                    <a href="${data.url}" target="_blank" rel="noopener noreferrer" class="btn-download">
                        <i class="fa-solid fa-circle-down"></i> Unduh File
                    </a>
                `;
            } else {
                showMessage(data.message || "Terjadi kesalahan yang tidak diketahui.", true);
            }
        })
        .catch(error => {
            console.error("Error saat fetch:", error);
            showMessage("Gagal terhubung ke server. Silakan coba lagi nanti.", true);
        })
        .finally(() => {
            downloadBtn.disabled = false;
            downloadBtn.classList.remove('loading');
        });
    });
    if (pasteBtn) {
        pasteBtn.addEventListener("click", async () => {
            try {
                const text = await navigator.clipboard.readText();
                urlInput.value = text;
            } catch (err) {
                console.error("Gagal menempelkan dari clipboard: ", err);
                showMessage("Browser Anda tidak mengizinkan tempel otomatis. Silakan tempel manual.", true);
            }
        });
    }

        // Kode untuk notifikasi
    const notification = document.createElement("div");
    notification.classList.add("custom-notification");
    notification.innerHTML = `
        <strong>📢 Website ini di Jual</strong>
        <p>Dibuat oleh: <b>Ariel Aprielyullah</b></p>
        <p>Tanggal: <b>25 Maret 2025</b></p>
        <button id="contact-btn">Hubungi</button>
        <button id="close-notif">Tutup</button>
    `;
    document.body.appendChild(notification);

    document.getElementById("close-notif").addEventListener("click", function () {
        notification.classList.add("hide");
        setTimeout(() => notification.remove(), 300);
    });

    document.getElementById("contact-btn").addEventListener("click", function () {
        window.location.href = "https://arielaprielyullah.vercel.app";
    });

    setTimeout(() => {
        notification.classList.add("show");
    }, 500);
});

