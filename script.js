document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const generateBtn = document.getElementById('generateBtn');
    const modal = document.getElementById('complianceModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    let currentTab = 'nda';

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentTab = this.dataset.tab;
            
            const outputBox = document.getElementById('documentOutput');
            if (outputBox) {
                outputBox.innerHTML = '<p class="placeholder-text">Параметры изменены. Запустите генерацию документа заново</p>';
            }
        });
    });

    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

    if (generateBtn) {
        generateBtn.addEventListener('click', function() {
            const clientType = document.getElementById('clientType').value;
            const partyName = document.getElementById('partyName').value.trim();
            const penaltyAmount = Number(document.getElementById('penaltyAmount').value).toLocaleString('ru-RU');
            const termMonths = document.getElementById('termMonths').value;
            const governingLaw = document.getElementById('governingLaw').value;
            const confidentialityScope = document.getElementById('confidentialityScope').value;
            
            const includeArbitration = document.getElementById('includeArbitration').checked;
            const personalData = document.getElementById('personalData').checked;
            const intellectualProperty = document.getElementById('intellectualProperty').checked;
            const nonSolicitation = document.getElementById('nonSolicitation').checked;

            if (!partyName) {
                alert('Пожалуйста, укажите наименование контрагента для составления акта.');
                return;
            }

            const currentDate = new Date().toLocaleDateString('ru-RU');
            let textHTML = '';

            let lawText = '';
            if (governingLaw === 'rf') {
                lawText = 'Законодательством Российской Федерации (Гражданский Кодекс РФ)';
            } else {
                lawText = 'Английским материальным и процессуальным правом (English Law)';
            }

            let scopeText = '';
            if (confidentialityScope === 'all') {
                scopeText = 'все передаваемые Сторонами друг другу сведения, включая устные переговоры, электронную переписку, исходные коды, бизнес-планы и спецификации продуктов';
            } else {
                scopeText = 'только те материальные носители информации, на которых непосредственно проставлен физический или электронный гриф «Коммерческая тайна»';
            }

            if (currentTab === 'nda') {
                let preamble = '';
                if (clientType === 'b2b') {
                    preamble = `ООО «Инновационные Технологии», именуемое в дальнейшем «Раскрывающая сторона», с одной стороны, и <strong>${partyName}</strong>, именуемое в дальнейшем «Принимающая сторона», в лице генерального директора, действующего на основании Устава, с другой стороны...`;
                } else {
                    preamble = `ООО «Инновационные Технологии», именуемое в дальнейшем «Раскрывающая сторона», с одной стороны, и гражданин(ка) <strong>${partyName}</strong>, именуемый(ая) в дальнейшем «Исполнитель», с другой стороны...`;
                }

                let arbitrationClause = '';
                if (includeArbitration) {
                    arbitrationClause = `<div class="doc-clause"><strong>4. Порядок разрешения споров:</strong> Все разногласия, возникающие из настоящего Соглашения или в связи с ним, подлежат обязательному рассмотрению в Арбитражном суде г. Москвы. Срок ответа на


льную претензию составляет 10 рабочих дней.</div>`;
                } else {
                    arbitrationClause = `<div class="doc-clause"><strong>4. Порядок разрешения споров:</strong> Все разногласия разрешаются Сторонами путем переговоров. в случае невозможности урегулирования спора мирным путем, дело передается в суд общей юрисдикции по месту регистрации Истца.</div>`;
                }

                let personalDataClause = '';
                if (personalData) {
                    personalDataClause = `<div class="doc-clause"><strong>5. Охрана персональных данных (ФЗ-152):</strong> Стороны обязуются обеспечивать максимальный уровень конфиденциальности и безопасности персональных данных сотрудников и клиентов при их обработке в соответствии с требованиями Федерального закона от 27.07.2006 № 152-ФЗ.</div>`;
                }

                let ipClause = '';
                if (intellectualProperty) {
                    ipClause = `<div class="doc-clause"><strong>6. Права на интеллектуальную собственность:</strong> Передача секретных сведений не влечет за собой отчуждения прав или выдачи лицензий на патенты, товарные знаки или программное обеспечение Раскрывающей стороны. Все права защищены.</div>`;
                }

                let nonSolClause = '';
                if (nonSolicitation) {
                    nonSolClause = `<div class="doc-clause"><strong>7. Запрет переманивания кадров (Non-solicitation):</strong> В течение срока действия настоящего соглашения Принимающая сторона обязуется не делать предложений о трудоустройстве действующим сотрудникам Раскрывающей стороны.</div>`;
                }

                textHTML = `
                    <div class="doc-title">Соглашение о неразглашении конфиденциальной информации (NDA)</div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
                        <div>г. Москва</div>
                        <div>${currentDate} г.</div>
                    </div>
                    <div class="doc-clause">${preamble}</div>
                    <div class="doc-clause"><strong>1. Предмет Соглашения:</strong> Раскрывающая сторона передает Принимающей стороне сведения, составляющие коммерческую тайну, в целях проведения аудита, реализации совместных специальных проектов и интеграций.</div>
                    <div class="doc-clause"><strong>2. Объем конфиденциальности:</strong> Защите подлежат следующие данные: ${scopeText}. Регулирование осуществляется по правилам, где применимым является право: ${lawText}.</div>
                    <div class="doc-clause"><strong>3. Сроки действия обязательств:</strong> Режим конфиденциальности в отношении полученной информации устанавливается на срок <strong>${termMonths} месяцев</strong> с момента подписания настоящего акта.</div>
                    <div class="doc-clause"><strong>4. Ответственность:</strong> За каждый установленный факт нарушения обязательств, предусмотренных настоящим Соглашением, Принимающая сторона обязуется выплатить Раскрывающей стороне фиксированный штраф в размере <strong>${penaltyAmount} рублей</strong>.</div>
                    ${arbitrationClause}
                    ${personalDataClause}
                    ${ipClause}
                    ${nonSolClause}
                    <div style="margin-top: 60px; display: flex; justify-content: space-between;">
                        <div><strong>От Раскрывающей стороны:</strong>
________________ / (ООО «Инновационные Технологии»)</div>
                        <div><strong>От Принимающей стороны:</strong>
________________ / (${partyName})</div>
                    </div>
                `;
            } else {
                let preamble = '';
                if (clientType === 'b2b') {
                    preamble = `ООО «Инновационные Технологии», именуемое в дальнейшем «Заказчик», с одной стороны, и <strong>${partyName}</strong>, именуемое в дальнейшем «Исполнитель», в лице руководителя, действующего на основании Устава, с другой стороны...`;
                } else {
                    preamble


= `ООО «Инновационные Технологии», именуемое в дальнейшем «Заказчик», с одной стороны, и гражданин(ка) <strong>${partyName}</strong>, именуемый(ая) в дальнейшем «Подрядчик», с другой стороны...`;
                }

                let arbitrationClause = '';
                if (includeArbitration) {
                    arbitrationClause = `<div class="doc-clause"><strong>4. Подсудность споров:</strong> Любые исковые заявления в рамках неисполнения обязательств по оказанию услуг направляются для разбирательства в Арбитражный суд г. Москвы.</div>`;
                } else {
                    arbitrationClause = `<div class="doc-clause"><strong>4. Подсудность споров:</strong> Нарушения условий договора рассматриваются в судебных инстанциях согласно территориальному законодательству Российской Федерации.</div>`;
                }

                let personalDataClause = '';
                if (personalData) {
                    personalDataClause = `<div class="doc-clause"><strong>5. Конфиденциальность данных:</strong> Исполнитель гарантирует соблюдение регламентов обработки конфиденциальных сведений физических лиц заказчика по правилам ФЗ-152.</div>`;
                }

                let ipClause = '';
                if (intellectualProperty) {
                    ipClause = `<div class="doc-clause"><strong>6. Полное отчуждение интеллектуальных прав (IP):</strong> Все исключительные права на результаты интеллектуальной деятельности, созданные в ходе выполнения услуг, переходят к Заказчику в полном объеме с момента подписания Акта приема-передачи.</div>`;
                }

                let nonSolClause = '';
                if (nonSolicitation) {
                    nonSolClause = `<div class="doc-clause"><strong>7. Кадровый комплаенс:</strong> Стороны обязуются соблюдать паритет и не осуществлять хедхантинг ключевых проектных менеджеров в рамках исполнения контракта.</div>`;
                }

                textHTML = `
                    <div class="doc-title">Договор на оказание коммерческих услуг</div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
                        <div>г. Москва</div>
                        <div>${currentDate} г.</div>
                    </div>
                    <div class="doc-clause">${preamble}</div>
                    <div class="doc-clause"><strong>1. Предмет Договора:</strong> Исполнитель обязуется по заданию Заказчика оказать комплекс ИТ или консалтинговых услуг, а Заказчик обязуется принять их и оплатить в установленные сроки. Регулирование: ${lawText}.</div>
                    <div class="doc-clause"><strong>2. Порядок сдачи работ:</strong> Сдача результатов осуществляется ежемесячно путем подписания Сторонами двусторонних Актов. Срок рассмотрения документов Заказчиком — 5 дней. Объем охвата: ${scopeText}.</div>
                    <div class="doc-clause"><strong>3. Штрафные санкции:</strong> В случае срыва сроков сдачи этапов или предоставления некачественного сервиса, Исполнитель выплачивает неустойку в размере <strong>${penaltyAmount} рублей</strong> за каждый прецедент. Общий срок контракта ограничен рамками в ${termMonths} мес.</div>
                    ${arbitrationClause}
                    ${personalDataClause}
                    ${ipClause}
                    ${nonSolClause}
                    <div style="margin-top: 60px; display: flex; justify-content: space-between;">
                        <div><strong>От Заказчика:</strong>
________________ / (ООО «Инновационные Технологии»)</div>
                        <div><strong>От Исполнителя:</strong>
________________ / (${partyName})</div>
                    </div>
                `;
            }

            const outputBox = document.getElementById('documentOutput');
            outputBox.innerHTML = textHTML;

            if (modal) {
                modal.style.display = 'flex';
            }
        });
    }
});
