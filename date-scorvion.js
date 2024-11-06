const bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
const currentDate = new Date();
let year = new Date().getFullYear();
let month = new Date().getMonth();
$(document).ready(function() {

    let html = `
        <div class="tbl-wrapper-date">
            <table class="tbl-date">
                <thead>
                    <tr>
                        <th colspan="7"><span class="printed-date"></span></th>
                    </tr>
                    <tr>
                        <th>Sen</th>
                        <th>Sel</th>
                        <th>Rab</th>
                        <th>Kam</th>
                        <th>Jum</th>
                        <th>Sab</th>
                        <th>Min</th>
                    </tr>
                </thead>
                <tbody class="list-tanggal"></tbody>
            </table>
            <div class="kontent-wrapper">
                <div class="tahun">
                    <span id="prev">&lt;&lt;</span>
                    <span id="resultY"></span>
                    <span id="next">&gt;&gt;</span>
                </div>
                <div class="bulan"></div>
            </div>              
        </div>
        `;
    $(document).on('focus', '.date-scorvion', function() {
        let ini = $(this);
        let tbl = ini.closest('tbody');
        tbl.find('tr .date-scorvion .tbl-wrapper-date').remove();
        $('.form-control-scorvion div').remove();
        ini.parent().find('.form-control-scorvion').append(html)

        function updateDateDisplay() {
            $(".printed-date").text(bulan[month] + " " + year);
            $('#resultY').text(year);
            renderCalendar();
        }

        function renderCalendar() {
            const $dateColumn = $(".list-tanggal");
            $dateColumn.empty();

            let firstDayNumber = firstDayInMonth();
            let daysInMonth = findDaysInMonth();
            let tanggal = 1;
            let totalRows = Math.ceil((firstDayNumber + daysInMonth) / 7);

            for (let i = 0; i < totalRows; i++) {
                const $row = $("<tr>");
                for (let j = 0; j < 7; j++) {
                    const $cell = $("<td>");

                    if (i === 0 && j < firstDayNumber) {
                        $cell.text("");
                    } else if (tanggal > daysInMonth) {
                        $cell.text("");
                    } else {
                        $cell.text(tanggal);

                        if (tanggal === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
                            $cell.addClass('today');
                        }
                        $cell.on('click', function() {
                            let namaBulan = $('.printed-date').text().split(' ')[0];
                            let bulanKeAngka = bulan.indexOf(namaBulan)+1;
                            let currentTanggal = $(this).text();
                            let bulanAngka = bulanKeAngka < 10 ? `0${bulanKeAngka}` : `${bulanKeAngka}`; 
                            let tgl = currentTanggal < 10 ? `0${currentTanggal}` : `${currentTanggal}`;
                            // ini.html(`${year}-${bulanKeAngka + 1}-${currentTanggal}`);
                            ini.val(`${year}-${bulanAngka}-${tgl}`);
                            $('.tbl-wrapper-date').css('display', 'none');
                            $('.kontent-wrapper').css('display', 'none');
                        });
                        tanggal++;
                    }
                    $row.append($cell);
                }
                $dateColumn.append($row);
            }
        }

        function firstDayInMonth() {
            let firstDay = new Date(year, month, 1).getDay();
            return (firstDay === 0) ? 6 : firstDay - 1;
        }

        function findDaysInMonth() {
            return new Date(year, month + 1, 0).getDate();
        }

        $(".printed-date").on('click', function() {
            $('.kontent-wrapper').css({
                display: 'grid',
                position: 'relative'
            });
            let $listBulan = '';
            $.each(bulan, function(index, val) {
                // $listBulan += `<ul><li class="select-month" data-index="${index}">${val}</li></ul>`;
                $listBulan += `<div class="bulan-item" data-index="${index}">${val}</div>`;
            });
            $('.bulan').html($listBulan);

            $(document).off('click', '#next').on('click', '#next', function() {
               year +=1 
               $('#resultY').text(year);
               updateDateDisplay();
            });
            
            $(document).off('click', '#prev').on('click', '#prev', function() {
                year -=1 
                $('#resultY').text(year);
                updateDateDisplay();
            });
        });

        $(document).on('click', '.bulan-item', function() {
            month = $(this).data('index');
            $('.kontent-wrapper').css('display', 'none');
            updateDateDisplay();
        });

        updateDateDisplay();

        $('.tbl-wrapper-date').css('display', 'grid')
    });

    $(document).on('click', function(e) {
        let target = $(e.target).closest('.tbl-wrapper-date, .kontent-wrapper, .date-scorvion').length;
        if (!target) {
            $('.tbl-wrapper-date').hide();
            $('.kontent-wrapper').hide();
        }
    });
});
