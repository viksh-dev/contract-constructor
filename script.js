document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generateBtn');
    
    if (generateBtn) {
        generateBtn.addEventListener('click', function() {
            const clientType = document.getElementById('clientType').value;
            const partyName = document.getElementById('partyName').value.trim();
            const penaltyAmount = Number(document.getElementById('penaltyAmount').value).toLocaleString('ru-RU');
            const includeArbitration = document.getElementById('includeArbitration').checked;
            const personalData = document.getElementById('personalData').checked;

            if (!partyName) {
                alert('Пожалуйста, укажите наименование контрагента.');
                return;
            }

            const currentDate = new Date().toLocaleDateString('ru-RU');

            let preamble = '';
            if (clientType === 'b2b') {
                preamble = `ООО «Инновационные Технологии», именуемое в дальнейшем «Раскрывающая сторона», с одной стороны, и <strong>${partyName}</strong>, именуемое в дальнейшем «Принимающая сторона», в лице генерального директора, действующего на основании Устава, с другой стороны...`;
            } else {
                preamble = `ООО «Инновационные Технологии», именуемое в дальнейшем «Раскрывающая сторона», с одной стороны, и гражданин(ка) <strong>${partyName}</strong>, именуемый(ая) в дальнейшем «Исполнитель», с другой стороны...`;
            }

            let arbitrationClause = '';
            if (includeArbitration) {
                arbitrationClause = `<div class="doc-clause"><strong>4. Разрешение споров:</strong> Все споры, возникающие из настоящего Соглашения или в связи с ним, подлежат рассмотрению в Арбитражном суде г. Москвы.</div>`;
            } else {
                arbitrationClause = `<div class="doc-clause"><strong>4. Разрешение споров:</strong> Споры разрешаются в соответствии с действующим законодательством РФ по месту нахождения Истца.</div>`;
            }

            let personalDataClause = '';
            if (personalData) {
                personalDataClause = `<div class="doc-clause"><strong>5. Защита персональных данных (ФЗ-152):</strong> Стороны обязуются обеспечивать конфиденциальность и безопасность персональных данных при их обработке в соответствии с требованиями Федерального закона от 27.07.2006 № 152-ФЗ.</div>`;
            }

            const documentHTML = `
                <div class="doc-title">СОГЛАШЕНИЕ О НЕРАЗГЛАШЕНИИ (NDA)</div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 25px;">
                    <div>г. Москва</div>
                    <div>${currentDate} г.</div>
                </div>
                <div class="doc-clause">${preamble}</div>
                <div class="doc-clause"><strong>1. Предмет Соглашения:</strong> Раскрывающая сторона передает Принимающей стороне конфиденциальную информацию, составляющую коммерческую тайну, в целях реализации совместных специальных проектов.</div>
                <div class="doc-clause"><strong>2. Обязанности Сторон:</strong> Принимающая сторона обязуется не разглашать Конфиденциальную информацию третьим лицам без предварительного письменного согласия Раскрывающей стороны.</div>
                <div class="doc-clause"><strong>3. Ответственность:</strong> За каждый факт нарушения обязательств, предусмотренных настоящим Соглашением, Принимающая сторона выплачивает Раскрывающей стороне штраф в размере <strong>${penaltyAmount} рублей</strong>.</div>
                ${arbitrationClause}
                ${personalDataClause}
                <div style="margin-top: 50px; display: flex; justify-content: space-between;">
                    <div><strong>От Раскрывающей стороны:</strong>
________________ / (ООО «Инновационные Технологии»)</div>
                    <div><strong>От Принимающей стороны:</strong>
________________ / (${partyName})</div>
                </div>
            `;

            const outputBox = document.getElementById('documentOutput')


outputBox.innerHTML = documentHTML;
        });
    }
});;
