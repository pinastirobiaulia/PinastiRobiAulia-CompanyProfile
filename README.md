# PinastiRobiAulia-CompanyProfile

### Link demo : https://drive.google.com/file/d/1vNUFSPkSxT7SOdJot0NB8eaDXyxwsZCb/view?usp=sharing

# Aplikasi Profil Perusahaan

## Fitur

### Frontend

* **Tampilan Proyek (Projects)**

  * Menampilkan daftar proyek dengan **judul, deskripsi, link, dan gambar**.
  * Layout tabel responsif dengan area scroll.
  * Bisa menggunakan **API**.

* **Artikel**

  * Menampilkan daftar artikel dengan **judul dan isi**.
  * Menampilkan gambar.


### Backend

* **Node.js + Express REST API**

  * `/projects` → Mengambil daftar proyek
  * `/articles` → Mengambil daftar artikel
  * Mendukung upload file (gambar) untuk proyek dan artikel

* **Upload File**

  * Gambar disimpan di folder `uploads/`
  * Bisa diakses melalui `/api/uploads/:filename`
---

## Environment Variables

Buat file `.env` di root folder:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

* `NEXT_PUBLIC_API_URL` → URL base backend untuk request API.

---

## Instalasi

1. Clone repository:

```
git clone <repository-url>
cd <project-folder>
```

2. Install dependencies frontend:

```
cd admin-app
npm install
```

3. Install dependencies backend:

```
cd backend
npm install
```

4. Jalankan backend:

```
npm run dev
```

5. Jalankan frontend:

```
npm run dev
```

6. Buka browser:

```
http://localhost:3000
```

## Teknologi

* **Frontend:** Next.js, React, Tailwind CSS, jsPDF, pdf-lib
* **Backend:** Node.js, Express, Sequelize
* **Database:** MongoDb

---
