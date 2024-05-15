import React, { FC } from "react";
import "../../App.css";
import { Typography } from "antd";
import { Row, Col } from "antd";
import { Collapse } from "antd";
const { Panel } = Collapse;

const { Title, Paragraph } = Typography;

export const Allergens: FC = () => {
  return (
    <div className="container">
      <Title style={{ textAlign: "center" }}>
        Представители древесного яруса
      </Title>

      <Row>
        <Col span={4}></Col>
        <Col span={16}>
          <Collapse>
            <Panel header="Берёза (Betula)" key="1">
              <Paragraph className="paragraph">
                Берёза – род листопадных деревьев и кустарников из семейства
                березовые (Betulaceae). Широко распростронена в Северном
                полушарии. Является одной из самых распространенных древесных
                пород на территории России. Общее число видов — около ста. Все
                виды березы – ветроопыляемые (анемофильные) растения, цветущие
                одновременно с распусканием листьев. Пыльца березы – основной
                аллерген в центральных районах России в апреле-мае.
              </Paragraph>
              <Paragraph className="paragraph">
                Пыльцевые зерна трезспоровые, изополярные,
                сплющено-сфероидальные, округлые или округло-треугольные в
                очертании с полюса и овальные в экваториальном положении,
                диаметром от 16 до 30 мкм. Поры экваториальные, сложные, в
                большей или меньшей степени приподняты над поверхностью
                пыльцевого зерна, с хорошо развитым околопоровым валиком и
                поровыми камерами. На порах часто сохраняется редуцированный
                оперкулюм в виде эллиптические, дисковидные или ромбовидные
                (Принципы и методы аэропалинологических исследований.
                Мейер-Меликян Н. Р. и др. / М.:МГУ, 1999. 49с.).
              </Paragraph>
              <div className="allergenImageWrapper">
                <img
                  src={require("../../images/bereza.jpg")}
                  className="allergenImage"
                />
              </div>
            </Panel>
            <Panel header="Вяз (Ulmus)" key="2">
              <Paragraph className="paragraph">
                Вяз – род листопадных деревьев из семейства буковые (Fagaceae).
                Распространен в зоне широколиственных и хвойно-широколиственных
                лесов, часто используется в озеленении. Род насчитывает около 40
                видов. Все виды вяза – ветроопыляемые растения, цветущие до
                распускания листьев. В центральных районах России цветение вяза
                приходится на середину апреля.
              </Paragraph>
              <Paragraph className="paragraph">
                Пыльцевые зерна сплющенные сфероидальные, 4-5 (7)- поровые, в
                очертании округло 4-5(7)-угольные. Экваториальный диаметр 22-50
                мкм, полярная ось – 22-40 мкм. Поры ободковые, от округлых до
                эллиптических, расположены равномерно по экватору, безкамерные.
                Диаметр пор составляет 3-4 мкм или 3,5 х 2 мкм. Ободок поры
                широкий, не имеет четких границ. Скульптура поверхности
                гребневидная или морщинистая (Принципы и методы
                аэропалинологических исследований. Мейер-Меликян Н. Р. и др. /
                М.:МГУ, 1999. 49с.).
              </Paragraph>
              <div className="allergenImageWrapper">
                <img
                  src={require("../../images/vyaz.jpg")}
                  className="allergenImage"
                />
              </div>
            </Panel>
            <Panel header="Дуб (Quercus)" key="3">
              <Paragraph className="paragraph">
                Дуб – род листопадных и вечнозеленых деревьев и кустарников из
                семейства буковые (Fagaceae). Естественным ареалом дуба являются
                области Cеверного полушария с умеренным климатом. Все виды дубов
                – ветроопыляемые (анемофильные) растения. В центральных районах
                России цветение дуба приходится на первую половину мая.
              </Paragraph>
              <Paragraph className="paragraph">
                Пыльцевые зерна трехбороздно-поровые, сфероидальные или
                сфероидально-эллипсоидальные. Полярная ось и экваториальный
                диаметр ~ 25-29 мкм. В очертании с полюса пыльцевые зерна
                округло-стрехлопастные, с экватора – от широкоэллиптических до
                почти округлых. Апокольпиум 10 мкм в диаметре; мезокольпиум – 22
                мкм. Борозды длинные, узкие, глубоко погруженные, с тупыми
                концами. Поры часто плохо различимы. Скульптура поверхности
                мелкобугорчато-ямчатая. Бугорки 0,2 мкм в диаметре, равномерно
                распределены по поверхности. Контур пыльцевых зерен волнистый
                (Принципы и методы аэропалинологических исследований.
                Мейер-Меликян Н. Р. и др. / М.:МГУ, 1999. 49с.).
              </Paragraph>
              <div className="allergenImageWrapper">
                <img
                  src={require("../../images/dub.jpg")}
                  className="allergenImage"
                />
              </div>
            </Panel>
            <Panel header="Ель (Picea)" key="4">
              <Paragraph className="paragraph">
                Ель — род хвойных вечнозелёных деревьев семейства Сосновые
                (Pinaceae). Случаи аллергических реакций на пыльцу хвойных очень
                редки, поэтому станции мониторинга обычно не публикуют данные о
                ее концентрации в атмосфере. Иногда отмечается перекрестная
                аллергическая реакция на пыльцу сосны и злаков (Allergenicity
                and cross-reactivity of pine pollen. Clin Exp Allergy.
                Gastaminza G. 2009, 39(9):1438-46.).
              </Paragraph>
              <Paragraph className="paragraph">
                Пыльцевые зерна крупные – 120 мкм, обычно имеют два воздушных
                мешка, иногда встречаются одномешковые формы и ещё 3-4 мешковые.
                Эктэкзина на проксимальной стороне корпуса (щит) значительно
                толще, чем на дистальной. На дистальной стороне пыльцевых зерен
                располагается одна лептома (Принципы и методы
                аэропалинологических исследований. Мейер-Меликян Н. Р. и др. /
                М.:МГУ, 1999. 49с.).
              </Paragraph>
              <div className="allergenImageWrapper">
                <img
                  src={require("../../images/el.jpg")}
                  className="allergenImage"
                />
              </div>
            </Panel>
            <Panel header="Ива (Salix)" key="5">
              <Paragraph className="paragraph">
                Ива – род листопадных деревьев и кустарников из семейства ивовые
                (Salicaceae). Распространена повсеместно. Большинство видов
                предпочитают влажные места обитания, часто встречаются на
                вырубках, по обочинам дорог, в подлеске. Род насчитывает более
                500 видов, в средней полосе России отмечены 16 видов. Ивы –
                раздельнополые двудомные растения, которые опыляются насекомыми
                (энтомофильные виды) и ветром (анемофильные виды). Некоторые
                виды ив цветут ранней весной до распускания листьев, другие – в
                конце весны, одновременно с распусканием листьев или позже, в
                начале лета.
              </Paragraph>
              <Paragraph className="paragraph">
                Пыльцевые зерна изополярные, эллипсоидальные, реже
                сфероидальные, в полярной проекции глубоко трехлопастные, в
                экваториальной – эллиптические. Борозды длинные, шириной около
                35 мкм, с заостренными концами и ровным краем, глубоко
                погруженные. Мембрана борозд зернистая, отличается по скульптуре
                от остальной поверхности пыльцевых зерен Поверхность сетчатая,
                стенки ячей сетки извилистые, ячеи угловатые, разной величины и
                конфигурации, диаметром 0,3-3,5 мкм. (Принципы и методы
                аэропалинологических исследований. Мейер-Меликян Н. Р. и др. /
                М.:МГУ, 1999. 49с.).
              </Paragraph>
              <div className="allergenImageWrapper">
                <img
                  src={require("../../images/iva.jpg")}
                  className="allergenImage"
                />
              </div>
            </Panel>
            <Panel header="Клён (Acer)" key="6">
              <Paragraph className="paragraph">
                Клён – род листопадных деревьев, реже кустарников, относящихся к
                семейству сапиндовые (Sapindaceae). Род включает более 160
                видов, из них на территории России произрастают около 20.
                Цветение кленов происходит обычно до распускания листьев и
                приходится на апрель-май. Опыление у разных видов происходит
                по-разному: среди кленов есть как ветроопыляемые (анемофильные),
                так и насекомоопыляемые (энтомофильные) виды.
              </Paragraph>
              <Paragraph className="paragraph">
                Пыльцевые зерна 3-бороздные, реже 2-4-бороздные,
                эллипсоидальные, сфероидальные или почти сфероидальные, средних
                размеров (полярная ось 28-38 мкм). Скульптура поверхности
                сетчатая, морщинистая, струйчатая, бугорчатая и гранулярная. В
                спородерме четко различаются экт- и эндэкзина (Принципы и методы
                аэропалинологических исследований. Мейер-Меликян Н. Р. и др. /
                М.:МГУ, 1999. 49с.).
              </Paragraph>
              <div className="allergenImageWrapper">
                <img
                  src={require("../../images/klen.jpg")}
                  className="allergenImage"
                />
              </div>
            </Panel>
            <Panel header="Лещина (Corylus)" key="7">
              <Paragraph className="paragraph">
                Лещина, или орешник — род кустарников (реже деревьев) семейства
                Берёзовые.
              </Paragraph>
              <Paragraph className="paragraph">
                Пыльцевые зерна изополярные, сплющено-сфероидальные, в полярном
                положении от треугольных до округло-треугольных, в
                экваториальном – эллиптичсекие, 3-поровые. Экваториальный
                диаметром 30-35 мкм, полярная ось 21-30 мкм. Поры ободковые,
                округлые, реже эллиптические, диаметром 6-7 мкм (включая
                ободок), граница ободка нечеткая.Под порами хорошо заметны
                онкусы. Поверхность пыльцевые зерна мелкошиповатая, шипики
                высотой около 0,2 мкм, густо расположенные, утолщенные у
                основания. В спородерме выявляются плотный толщиной 0,8 мкм,
                гранулярный слой ( 0,6-0,7 мкм), довольной тонкий (0,25 мкм)
                плотный подстилающий слой и интина, значительно утолщающаяся под
                порами (Принципы и методы аэропалинологических исследований.
                Мейер-Меликян Н. Р. и др. / М.:МГУ, 1999. 49с.).
              </Paragraph>
              <div className="allergenImageWrapper">
                <img
                  src={require("../../images/leshina.jpg")}
                  className="allergenImage"
                />
              </div>
            </Panel>
            <Panel header="Липа (Tilia)" key="8">
              <Paragraph className="paragraph">
                Липа — род древесных растений. Объединяет около сорока пяти
                видов деревьев и крупных кустарников, а также свыше сотни
                гибридогенных видов.
              </Paragraph>
              <Paragraph className="paragraph">
                Пыльцевые зерна 3-бороздные-оровые, сплющено-сфероидальные,
                изополярные, в очертании с полюсов округлые, с экватора –
                эллиптические, диаметром 27-37 мкм. Борозды короткие,
                эллиптические, с ровным краем и тупыми концами, оры
                продольно-вытянутые. Скульптура мелкоячеистая, с воронковидными
                углублениями диаметром 0,7-1,2 мкм. Контуры ямок варьируют в
                пределах одного пыльцевого зерна от округлых до овальных,
                многоугольных, разнообразно вытянутых, редко сливающихся между
                собой. Спородерма имеет эктэкзину, состоящую из покрова, в
                котором отчетливо выявляются воронковидные углубления. Эндэкзина
                значительно утолщается к краям апертур (Принципы и методы
                аэропалинологических исследований. Мейер-Меликян Н. Р. и др. /
                М.:МГУ, 1999. 49с.).
              </Paragraph>
              <div className="allergenImageWrapper">
                <img
                  src={require("../../images/lipa.jpg")}
                  className="allergenImage"
                />
              </div>
            </Panel>
            <Panel header="Ольха (Alnus)" key="9">
              <Paragraph className="paragraph">
                Ольха – род листопадных деревьев или, реже, кустарников из
                семейства березовые (Betulaceae). Это ветроопыляемое
                (анемофильное) растение, цветущее задолго до распускания
                листьев. Цветение ольхи открывает сезон пыления в средних
                широтах и приходится обычно на конец марта – начало апреля.
              </Paragraph>
              <Paragraph className="paragraph">
                Пыльцевые зерна сплющено-сфероидальные, в очертании с полюса
                4-5-угольные, с экватора эллиптические, 4-5-поровые. Длина
                полярной оси 14,2 – 18 мкм, экваториального диаметра 25,2-27,6
                мкм. Поры ободковые, диаметром 7,2-8 мкм (с ободком), камерные,
                с онкусом и оперкулюмом. Поровые отверстия округлые (диаметром
                3,5-4 мкм) или овальные (1,8-2,2 мкм в ширину и 3,6-4,4 мкм в
                длину). Камера поры дисковидная. Скульптура
                мелкобугорчато-шиповатая. Спородерма с четко выступающими
                арками, в остальном её строение схожо с строением спородермы
                Betula (Принципы и методы аэропалинологических исследований.
                Мейер-Меликян Н. Р. и др. / М.:МГУ, 1999. 49с.).
              </Paragraph>
              <div className="allergenImageWrapper">
                <img
                  src={require("../../images/olha.jpg")}
                  className="allergenImage"
                />
              </div>
            </Panel>
            <Panel header="Сосна (Pinus)" key="10">
              <Paragraph className="paragraph">
                Сосна — типовой род хвойных деревьев, кустарников или стлаников
                семейства Сосновые (Pinaceae). Именно из-за пыльцы хвойных в
                конце мая на поверхности луж и асфальте после дождя появляются
                желтые разводы.
              </Paragraph>
              <Paragraph className="paragraph">
                Пыльцевые зерна билатерально-симметричные, широко
                эллипсоидальные, с двумя воздушными мешками, в очертании с
                полюса эллиптические или округлые, с экватора – эллиптические.
                Длина большей оси около 80 мкм (включая воздушные мешки). Длина
                корпуса (экваториальный диаметр) ~55 мкм, ширина (полярная ось)
                ~40 мкм. Мешки почти шаровидные, слегка сплющенные, шириной ~40
                мкм, в месте их прикрепления образуются многочисленные складки.
                Щит равномерно утолщенный (до 2,5 мкм), у основания мешков на
                нем образуются бугры и складки, являющиеся продолжением складок
                воздушного мешка, контур щита мелковолокнистый. На дистальной
                стороне пыльцевого зерна расположена 1 борозда шириной до 10
                мкм, имеющая гладкую поверхность. Воздушные мешки отчетливо
                ячеистые, корпус – бугорчатый при верхнем положении микровинта и
                мелкоячеистый в оптическом сечении. В центре мешка формируется
                объемная воздушная полость (Принципы и методы
                аэропалинологических исследований. Мейер-Меликян Н. Р. и др. /
                М.:МГУ, 1999. 49с.).
              </Paragraph>
              <div className="allergenImageWrapper">
                <img
                  src={require("../../images/sosna.jpg")}
                  className="allergenImage"
                />
              </div>
            </Panel>
            <Panel header="Тополь (Populus)" key="11">
              <Paragraph className="paragraph">
                Тополь — род двудомных (редко однодомных) листопадных
                быстрорастущих деревьев семейства Ивовые (Salicaceae).
              </Paragraph>
              <Paragraph className="paragraph">
                Пыльцевые зерна диаметром около 28 мкм. Скульптура при малых
                увеличениях выглядит зернистой, при больших – бугорчатой,
                бугорки неровные, различаются по размерам и форме ( от округлых
                с диаметром 0,1- 0,5 мкм до имеющих неопределенную форму,
                нередко сильно вытянутых), беспорядочно расположены с
                промежутками около 0,5 мкм. На 10 мкм^2 приходится около 12
                бугорков (Принципы и методы аэропалинологических исследований.
                Мейер-Меликян Н. Р. и др. / М.:МГУ, 1999. 49с.).
              </Paragraph>
              <div className="allergenImageWrapper">
                <img
                  src={require("../../images/topol.jpg")}
                  className="allergenImage"
                />
              </div>
            </Panel>
          </Collapse>{" "}
          <Title style={{ textAlign: "center", marginTop: 20 }}>
            Представители трав
          </Title>
          <Collapse>
            <Panel header="Амброзия (Ambrosia)" key="1">
              <Paragraph className="paragraph">
                Амброзия – род однолетних или многолетних травянистых растений
                из семейства сложноцветные, или астровые (Compositae,
                Asretaceae). Все виды амброзии – ветроопыляемые растения,
                цветущие в конце лета и осенью.
              </Paragraph>
              <Paragraph className="paragraph">
                Пыльцевые зерна 3-6-бороздно-оровые, сфероидальные или
                сплющенно-сфероидальные. Полярная ось 23 мкм, экваториальный
                диаметр 24 мкм. Борозды короткие, 10-13 мкм, широкие, резко
                сужающиеся к концам. Мембрана борозд гладкая. Оры мелкие, не
                превышают 2,5-3 мкм. Скульптура шиповатая. Шипы
                ширококонические, иногда с оттянутой вершиной, некрупные,
                высотой около 1,5-2 мкм. Шипы вплотную примыкают друг к другу,
                почти соприкасаясь основаниями. Расстояние между вершинами
                шиповы 3-4 мкм. Экзина толщиной 1,5 мкм (Принципы и методы
                аэропалинологических исследований. Мейер-Меликян Н. Р. и др. /
                М.:МГУ, 1999. 49с.).
              </Paragraph>
              <div className="allergenImageWrapper">
                <img
                  src={require("../../images/ambrozia.jpg")}
                  className="allergenImage"
                />
              </div>
            </Panel>
            <Panel header="Злаки (Poaceae)" key="2">
              <Paragraph className="paragraph">
                Злаки, или Мятликовые (Poaceae) – семейство однодольных
                растений, объединяющее более 11 000 видов. Цветение злаков
                начинается поздней весной и продолжается все лето, для некоторых
                видов известно повторное осеннее цветение. Все злаки относятся к
                ветроопыляемым растениям. Пыльца злаков – основная причина
                поллиноза в первой половине лета. Пыльца разных видов злаков
                морфологически неразличима, поэтому в составе воздушного спектра
                они анализируются как единая группа.
              </Paragraph>
              <Paragraph className="paragraph">
                Пыльцевые зерна однопоровые, радиально- или
                билатерально-симметричные, варьирующие по форме от шаровидных,
                широкоэллипсоидальных до яйцевидных и широкояйцевидных. В
                очертании пыльцевые зерна округлые, овальные, эллиптические,
                широкоовальные, широкоэллиптические. Наибольший диаметр
                составляет около 25-70 мкм. Пора расположена на экваторе. Поры
                круглые, редко овальные, ободковые, выступающие над общей
                поверхностью пыльцевого зерна Диаметр поры с ободком составляет
                около 2,5-6,0 мкм. Отверстие покрыто крышечкой (оперкулюмом),
                который не всегда сохраняется. При малых увеличениях СМ
                поверхность пыльцы выглядит гладкой, мелкозернистой или
                мелкоточечной (Принципы и методы аэропалинологических
                исследований. Мейер-Меликян Н. Р. и др. / М.:МГУ, 1999. 49с.).
              </Paragraph>
              <div className="allergenImageWrapper">
                <img
                  src={require("../../images/zlaki.jpg")}
                  className="allergenImage"
                />
              </div>
            </Panel>
            <Panel header="Крапива (Urtíca)" key="3">
              <Paragraph className="paragraph">
                Крапива — род цветковых растений семейства Крапивные
                (Urticaceae). Она стоит на втором месте по количеству пыльцевых
                зерен за сезон, после березы. У крапивы невероятно длинный
                период пыления: первые пыльцевые зерна появляются в середине
                июня, последние исчезают только с наступление холодов в конце
                сентября. Пик пыления крапивы обычно приходится на первую декаду
                июля, концентрация в этот момент может превышать 1000 пыльцевых
                зерен в кубометре воздуха.
              </Paragraph>
              <Paragraph className="paragraph">
                Пыльцевые зерна экваториально-2(3)-поровые,почти сфероидальные,
                в очертании с полюса округло-треугольные или почти округлые, с
                экваторы сплющенно-эллиптические; полярная ось составляет
                10,5-14,4 мкм, экваториальный диаметр – 14 мкм. Поры
                экваториальные, не поднимающиеся, поровое отверстие округлое.
                Текстура мелкобугорчатая. Экзина покровная, очень тонкая, 0,5
                мкм толщиной. Структура неравномерно шиповатая (Принципы и
                методы аэропалинологических исследований. Мейер-Меликян Н. Р. и
                др. / М.:МГУ, 1999. 49с.).
              </Paragraph>
              <div className="allergenImageWrapper">
                <img
                  src={require("../../images/krapiva.jpg")}
                  className="allergenImage"
                />
              </div>
            </Panel>
            <Panel header="Марь (Chenopodium)" key="4">
              <Paragraph className="paragraph">
                Маревые - семейство двудольных растений, объединяющее более 1500
                видов. Цветки маревых однополые или обоеполые, опыляются в
                основном при помощи ветра. Пыльца разных видов маревых
                морфологически неразличима, поэтому в составе воздушного спектра
                они анализируются как единая группа.
              </Paragraph>
              <Paragraph className="paragraph">
                Пыльцевые зерна мелкие, диаметром около 20 мкм. Поры в числе до
                80 равномерно расположены по поверхности пыльцевых зерен,
                диаметр пор около 1 мкм, края четко очерчены. Поверхность
                пыльцевых зерен очень ровная, с мелкими бугорками. Диаметр
                бугорков составляет 0,1 мкм; на 1 мкм^2 приходится 2-4 бугорка.
                Край пыльцевых зерен волнистый (Принципы и методы
                аэропалинологических исследований. Мейер-Меликян Н. Р. и др. /
                М.:МГУ, 1999. 49с.).
              </Paragraph>
              <div className="allergenImageWrapper">
                <img
                  src={require("../../images/mar.jpg")}
                  className="allergenImage"
                />
              </div>
            </Panel>
            <Panel header="Подорожник (Plantago)" key="5">
              <Paragraph className="paragraph">
                Подорожник — род одно- и многолетних трав, реже полукустарников
                семейства Подорожниковые (Plantaginaceae). Насчитывает более 153
                видов, распространённых по всему земному шару; многие из них
                считаются сорняками.
              </Paragraph>
              <Paragraph className="paragraph">
                Пыльцевые зерна многопоровые, сфероидальные, редко слегка
                сплющенные, 20-40 мкм диаметром. Поры округлые, Скульптура
                поверхности мелкошиповатая или бугорчатая, текстура
                мелкоточечная (Принципы и методы аэропалинологических
                исследований. Мейер-Меликян Н. Р. и др. / М.:МГУ, 1999. 49с.).
              </Paragraph>
              <div className="allergenImageWrapper">
                <img
                  src={require("../../images/podorozhnik.jpg")}
                  className="allergenImage"
                />
              </div>
            </Panel>
            <Panel header="Полынь (Artemisia)" key="6">
              <Paragraph className="paragraph">
                Полынь – род преимущественно многолетних травянистых растений
                или полукустарников из семейства сложноцветные, или астровые
                (Compositae, Asretaceae). Род насчитывает более 450 видов,
                распространенных по всему северному полушарию. Полынь –
                ветроопыляемое растение, цветущее во второй половине лета.
              </Paragraph>
              <Paragraph className="paragraph">
                Пыльцевые зерна трехбороздно-оровые, эллипсоидальные или
                сфероидальные. Полярная ось 24,4 мкм, экваториальный диаметр 21
                мкм. Борозды длинные, глубокие.Мембрана борозд шероховатая. Оры
                некрупные, около 2 мккм в диаметре. Скульптура мелкошиповатая.
                Шипики селкие, ширококонические, с заостренной вершинной. Высота
                шипика 0,2-0,3 мкм, диаметр основания 0,5-0,8 мкм. Шипики
                распологаются на расстоянии 1-1,5 мкм один от другого. Между
                шипиками в беспорядке располагаются многочисленные мелкие
                бугорки (Принципы и методы аэропалинологических исследований.
                Мейер-Меликян Н. Р. и др. / М.:МГУ, 1999. 49с.).
              </Paragraph>
              <div className="allergenImageWrapper">
                <img
                  src={require("../../images/polyn.jpg")}
                  className="allergenImage"
                />
              </div>
            </Panel>
            <Panel header="Щавель (Rumex)" key="7">
              <Paragraph className="paragraph">
                Щавель — род одно- и многолетних трав и полукустарников
                семейства Гречишные (Polygonaceae) с продолговатыми листьями.
              </Paragraph>
              <Paragraph className="paragraph">
                Пыльцевые зерна 3-4(6)-бороздно-оровые, почти сфероидальные или
                сфероидальные, слегка сжатые с полюсов, в очертании округлые или
                округло-лопастные. Борозды длинные, узкие. Оры округлые или
                меридиально вытянутые, диаметром 35-4 мкм. Скульптура
                поверхности извилисто-бугорчато-шиповатая (Принципы и методы
                аэропалинологических исследований. Мейер-Меликян Н. Р. и др. /
                М.:МГУ, 1999. 49с.).
              </Paragraph>
              <div className="allergenImageWrapper">
                <img
                  src={require("../../images/shavel.jpg")}
                  className="allergenImage"
                />
              </div>
            </Panel>
          </Collapse>
        </Col>
        <Col span={4}></Col>
      </Row>
    </div>
  );
};
