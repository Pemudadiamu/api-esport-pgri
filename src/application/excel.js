import ExcelJS from 'exceljs'

const url = 'http://localhost:9999/' // nanti ganti
export const exportSheet = async(datas) => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet(`Absensi Kegiatan ${datas[0].kegiatan.nama_kegiatan}`)
    sheet.columns = [
        { header: 'Waktu Absen', key: 'waktu', width: 15 }
        ,{header : "Nama" , key : 'nama' , width : 35},
        {header : 'Deskripsi' , key : 'desc' , width : 50},
        {header : "Mood" , key : "mood" , width: 10},
        {header : "Bukti" , key : "bukti" , width : 50},
    ]

    for (const data of datas) {
        sheet.addRow({ 
            waktu : data.createdAt,
            nama : data.user.nama,
            desc : data.deskripsi,
            mood : data.mood,
            bukti : url + 'assets/' +data.bukti
         });
         
    }

    sheet.getRow(1).font = { bold: true };
    sheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFD700' }
    }

    await workbook.xlsx.writeFile(`./assets/excel/absen_${datas[0].kegiatan.nama_kegiatan}.xlsx`);
    return `./assets/excel/absen_${datas[0].kegiatan.nama_kegiatan}.xlsx`
}

