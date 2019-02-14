const mongoose = require('mongoose');

const config = require('./config');

const User = require('./models/User');
const Artist = require('./models/Artist');
const Album = require('./models/Album');
const Track = require('./models/Track');


mongoose.set('useCreateIndex', true);
mongoose.connect(config.db.url + '/' + config.db.name, {useNewUrlParser: true });


const db = mongoose.connection;

db.once('open', async () => {
    try{
        await db.dropCollection('users');

    }
    catch (e) {
        console.log('Collection Users where not present, skipping drop...');
    }
    try{
        await db.dropCollection('artists');
    }
    catch (e) {
        console.log('Collection Artists where not present, skipping drop...');
    }
    try{
        await db.dropCollection('albums');
    }
    catch (e) {
        console.log('Collection Albums where not present, skipping drop...');
    }
    try{
        await db.dropCollection('tracks');
    }
    catch (e) {
        console.log('Collection Tracks where not present, skipping drop...');
    }




    console.log('All collections is dropped');

    const [user, admin] = await User.create({
        username: 'test',
        password: 'test',
        role: 'user'
    },{
        username: 'admin',
        password: 'admin',
        role: 'admin'
    });
    console.log('Users created');

    const [art1, art2] = await Artist.create({
        name: 'Кино',
        information: '«Кино́» — одна из самых популярных советских рок-групп 1980-х годов. Лидером и автором практически всех текстов и музыки неизменно оставался Виктор Цой, после смерти которого коллектив, выпустивший в общей сложности за девять лет на студийных альбомах более ста песен, несколько сборников и концертных записей, а также большое количество неофициальных бутлегов, прекратил существование.  Стилистически группа ушла от многих традиционных элементов русского рока, в частности вместо обычных ударных установок нередко использовались разнообразные программируемые эффекты, создаваемые посредством драм-машин, что порой придавало звучанию налёт «дискотечности» или «попсовости». Тематическая составляющая лирики на раннем этапе творчества отражает подростковую обыденность и драматические переживания по поводу любви, благодаря чему музыканты удостоились звания «новые романтики»; в более же поздних текстах героика и протест сочетаются с трагичностью мироощущения.  Популярность «Кино» с годами постоянно росла, если вначале музыканты играли лишь на квартирниках и подвергались жёсткой критике как со стороны официальной, так и подпольной прессы, то в конце десятилетия их пластинки распространялись миллионными тиражами, а на концерты собирались целые стадионы поклонников. Группа породила феномен «киномании», усилившийся после трагической гибели Виктора Цоя и существующий по сей день — место работы музыканта стало объектом паломничества многочисленных фанатов со всех стран постсоветского пространства, в Кривоарбатском переулке (Москва) появилась так называемая «стена Цоя», которую поклонники исписали цитатами из песен и признаниями в любви к творчеству группы. «Кино» часто находит отражение в массовой культуре, оставленное ими наследие высоко оценивается сегодняшними обозревателями и музыковедами.',
        image: 'kino.png'
    },{
        name: 'Кипелов',
        information: '«Кипе́лов» — российская рок-группа под руководством Валерия Кипелова, играющая в стиле хеви-метал и симфоник-метал, основанная в 2002 году. Лауреат премии «MTV Russia Music Awards» 2004 года как лучший рок-проект.',
        image: 'kipelov.jpeg'
    });
    console.log('Artists created');


    const [alb1, alb2, alb3] = await Album.create({
        title: 'Группа крови',
        artist: art1._id,
        year: 1988,
        cover: 'GruppaKrovi.jpg'
    },{
        title: 'Звезда по имени Солнце',
        artist: art1._id,
        year: 1989,
        cover: 'ZvezdaPoImeniSolnce.jpg'
    },{
        title: 'Путь наверх',
        artist: art2._id,
        year: 2003,
        cover: 'PutNaverh.jpeg'
    });
    console.log('Albums created');



    const track = await Track.create({
        title: "Группа крови",
        album: alb1._id,
        duration: "4:46"

    },{
        title: "Закрой за мной дверь",
        album: alb1._id,
        duration: "4:16"

    },{
        title: "Война",
        album: alb1._id,
        duration: "4:05"

    },{
        title: "Спокойная ночь",
        album: alb1._id,
        duration: "6:08"

    },{
        title: "Мама, мы все сошли с ума",
        album: alb1._id,
        duration: "4:07"

    },{
        title: "Бошетунмай",
        album: alb1._id,
        duration: "4:09"

    },{
        title: "В наших глазах",
        album: alb1._id,
        duration: "3:35"

    },{
        title: "Попробуй спеть вместе со мной",
        album: alb1._id,
        duration: "4:36"

    },{
        title: "Прохожий",
        album: alb1._id,
        duration: "3:39"

    },{
        title: "Дальше действовать будем мы",
        album: alb1._id,
        duration: "3:56"

    },{
        title: "Легенда",
        album: alb1._id,
        duration: "4:05"

    },{
        title: "Песня без слов",
        album: alb2._id,
        duration: "5:07"

    },{
        title: "Звезда по имени Солнце",
        album: alb2._id,
        duration: "3:46"

    },{
        title: "Невесёлая песня",
        album: alb2._id,
        duration: "4:18"

    },{
        title: "Сказка",
        album: alb2._id,
        duration: "5:59"

    },{
        title: "Место для шага вперёд",
        album: alb2._id,
        duration: "3:40"

    },{
        title: "Пачка сигарет",
        album: alb2._id,
        duration: "4:29"

    },{
        title: "Стук",
        album: alb2._id,
        duration: "3:51"

    },{
        title: "Печаль",
        album: alb2._id,
        duration: "5:32"

    },{
        title: "Апрель",
        album: alb2._id,
        duration: "4:40"

    },{
        title: "Путь наверх",
        album: alb3._id,
        duration: "8:18"

    },{
        title: "Я не сошел с ума",
        album: alb3._id,
        duration: "6:18"

    },{
        title: "Грязь",
        album: alb3._id,
        duration: "4:33"

    },{
        title: "Бесы",
        album: alb3._id,
        duration: "3:43"

    },{
        title: "Дьявольский зной",
        album: alb3._id,
        duration: "5:20"

    },{
        title: "Castlevania",
        album: alb3._id,
        duration: "6:15"

    });

    console.log('Tracks created');

    db.close();


});