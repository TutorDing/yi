document.addEventListener('DOMContentLoaded', () => {
    const shakeButton = document.getElementById('shakeButton');
    const resultContainer = document.getElementById('result');
    const tube = document.querySelector('.tube');
    const hexagramNameElement = document.getElementById('hexagramName');
    const lineNumberElement = document.getElementById('lineNumber');
    const lineTextElement = document.getElementById('lineText');

    // 显示卦象的函数
    function displayHexagram() {
        // 添加摇动动画
        tube.classList.add('shaking');
        shakeButton.disabled = true;

        // 随机选择卦象和爻
        const randomIndex = Math.floor(Math.random() * hexagramData.length);
        const selectedHexagram = hexagramData[randomIndex];

        // 1秒后显示结果
        setTimeout(() => {
            tube.classList.remove('shaking');
            shakeButton.disabled = false;

            hexagramNameElement.textContent = selectedHexagram.hexagram;
            lineNumberElement.textContent = selectedHexagram.position;
            lineTextElement.textContent = selectedHexagram.content;

            resultContainer.style.display = 'block';
            resultContainer.style.animation = 'fadeIn 1s';
        }, 1000);
    }

    // 点击按钮事件
    shakeButton.addEventListener('click', displayHexagram);

    // 检测设备是否支持摇动检测
    if (window.DeviceMotionEvent) {
        let lastUpdate = 0;
        let lastX = 0, lastY = 0, lastZ = 0;
        const threshold = 15; // 摇动灵敏度阈值

        // 处理设备摇动
        window.addEventListener('devicemotion', (event) => {
            const currentTime = new Date().getTime();
            const diffTime = currentTime - lastUpdate;

            if (diffTime > 100) { // 限制检查频率
                const acceleration = event.accelerationIncludingGravity;
                if (!acceleration) return;

                const deltaX = Math.abs(acceleration.x - lastX);
                const deltaY = Math.abs(acceleration.y - lastY);
                const deltaZ = Math.abs(acceleration.z - lastZ);

                if (deltaX > threshold || deltaY > threshold || deltaZ > threshold) {
                    if (!shakeButton.disabled) { // 防止动画还在进行时触发
                        displayHexagram();
                    }
                }

                lastX = acceleration.x;
                lastY = acceleration.y;
                lastZ = acceleration.z;
                lastUpdate = currentTime;
            }
        });

        // 请求设备运动权限（iOS 13+需要）
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            document.body.addEventListener('click', () => {
                DeviceMotionEvent.requestPermission()
                    .then(response => {
                        if (response === 'granted') {
                            console.log('设备运动权限已获取');
                        }
                    })
                    .catch(console.error);
            }, { once: true });
        }
    }

    // 卦象数据数组
    const hexagramData = [
        // 乾卦
        { hexagram: "乾卦", position: "初九", content: "潜龙勿用" },
        { hexagram: "乾卦", position: "九二", content: "见龙在田，利见大人" },
        { hexagram: "乾卦", position: "九三", content: "君子终日乾乾，夕惕若厉，无咎" },
        { hexagram: "乾卦", position: "九四", content: "或跃在渊，无咎" },
        { hexagram: "乾卦", position: "九五", content: "飞龙在天，利见大人" },
        { hexagram: "乾卦", position: "上九", content: "亢龙有悔" },
        
        // 坤卦
        { hexagram: "坤卦", position: "初六", content: "履霜，坚冰至" },
        { hexagram: "坤卦", position: "六二", content: "直方大，不习无不利" },
        { hexagram: "坤卦", position: "六三", content: "含章可贞，或从王事，无成有终" },
        { hexagram: "坤卦", position: "六四", content: "括囊，无咎无誉" },
        { hexagram: "坤卦", position: "六五", content: "黄裳元吉" },
        { hexagram: "坤卦", position: "上六", content: "龙战于野，其血玄黄" },

        // 屯卦
        { hexagram: "屯卦", position: "初九", content: "磐桓，利居贞，利建侯" },
        { hexagram: "屯卦", position: "六二", content: "屯如邅如，乘马班如，匪寇婚媾，女子贞不字，十年乃字" },
        { hexagram: "屯卦", position: "六三", content: "即鹿无虞，惟入于林中，君子几不如舍，往吝" },
        { hexagram: "屯卦", position: "六四", content: "乘马班如，求婚媾，往吉，无不利" },
        { hexagram: "屯卦", position: "九五", content: "屯其膏，小贞吉，大贞凶" },
        { hexagram: "屯卦", position: "上六", content: "乘马班如，泣血涟如" },

        // 蒙卦
        { hexagram: "蒙卦", position: "初六", content: "发蒙，利用刑人，用说桎梏，以往吝" },
        { hexagram: "蒙卦", position: "九二", content: "包蒙吉，纳妇吉，子克家" },
        { hexagram: "蒙卦", position: "六三", content: "勿用取女，见金夫，不有躬，无攸利" },
        { hexagram: "蒙卦", position: "六四", content: "困蒙，吝" },
        { hexagram: "蒙卦", position: "六五", content: "童蒙，吉" },
        { hexagram: "蒙卦", position: "上九", content: "击蒙，不利为寇，利御寇" },

        // 需卦
        { hexagram: "需卦", position: "初九", content: "需于郊，利用恒，无咎" },
        { hexagram: "需卦", position: "九二", content: "需于沙，小有言，终吉" },
        { hexagram: "需卦", position: "九三", content: "需于泥，致寇至" },
        { hexagram: "需卦", position: "六四", content: "需于血，出自穴" },
        { hexagram: "需卦", position: "九五", content: "需于酒食，贞吉" },
        { hexagram: "需卦", position: "上六", content: "入于穴，有不速之客三人来，敬之终吉" },

        // 讼卦
        { hexagram: "讼卦", position: "初六", content: "不永所事，小有言，终吉" },
        { hexagram: "讼卦", position: "九二", content: "不克讼，归而逋，其邑人三百户无眚" },
        { hexagram: "讼卦", position: "六三", content: "食旧德，贞厉，终吉。或从王事，无成" },
        { hexagram: "讼卦", position: "九四", content: "不克讼，复即命，渝安贞，吉" },
        { hexagram: "讼卦", position: "九五", content: "讼，元吉" },
        { hexagram: "讼卦", position: "上九", content: "或锡之鞶带，终朝三褫之" },

        // 师卦
        { hexagram: "师卦", position: "初六", content: "师出以律，否臧凶" },
        { hexagram: "师卦", position: "九二", content: "在师中，吉无咎，王三锡命" },
        { hexagram: "师卦", position: "六三", content: "师或舆尸，凶" },
        { hexagram: "师卦", position: "六四", content: "师左次，无咎" },
        { hexagram: "师卦", position: "六五", content: "田有禽，利执言，无咎。长子帅师，弟子舆尸，贞凶" },
        { hexagram: "师卦", position: "上六", content: "大君有命，开国承家，小人勿用" },

        // 比卦
        { hexagram: "比卦", position: "初六", content: "有孚比之，无咎。有孚盈缶，终来有它吉" },
        { hexagram: "比卦", position: "六二", content: "比之自内，贞吉" },
        { hexagram: "比卦", position: "六三", content: "比之匪人" },
        { hexagram: "比卦", position: "六四", content: "外比之，贞吉" },
        { hexagram: "比卦", position: "九五", content: "显比，王用三驱，失前禽，邑人不诫，吉" },
        { hexagram: "比卦", position: "上六", content: "比之无首，凶" },

        // 小畜卦
        { hexagram: "小畜卦", position: "初九", content: "复自道，何其咎，吉" },
        { hexagram: "小畜卦", position: "九二", content: "牵复，吉" },
        { hexagram: "小畜卦", position: "九三", content: "舆说辐" },
        { hexagram: "小畜卦", position: "六四", content: "有孚，血去惕出，无咎" },
        { hexagram: "小畜卦", position: "九五", content: "有孚挛如，富以其邻" },
        { hexagram: "小畜卦", position: "上九", content: "既雨既处，尚德载，妇贞厉。月几望，君子征凶" },

        // 履卦
        { hexagram: "履卦", position: "初九", content: "素履往，无咎" },
        { hexagram: "履卦", position: "九二", content: "履道坦坦，幽人贞吉" },
        { hexagram: "履卦", position: "六三", content: "眇能视，跛能履，履虎尾，咥人，凶。武人为于大君" },
        { hexagram: "履卦", position: "九四", content: "履虎尾，愬愬终吉" },
        { hexagram: "履卦", position: "九五", content: "夬履，贞厉" },
        { hexagram: "履卦", position: "上九", content: "视履考祥，其旋元吉" },

        // 泰卦
        { hexagram: "泰卦", position: "初九", content: "拔茅茹，以其汇，征吉" },
        { hexagram: "泰卦", position: "九二", content: "包荒，用冯河，不遐遗，朋亡，得尚于中行" },
        { hexagram: "泰卦", position: "九三", content: "无平不陂，无往不复，艰贞无咎。勿恤其孚，于食有福" },
        { hexagram: "泰卦", position: "六四", content: "翩翩不富，以其邻，不戒以孚" },
        { hexagram: "泰卦", position: "六五", content: "帝乙归妹，以祉元吉" },
        { hexagram: "泰卦", position: "上六", content: "城复于隍，勿用师。自邑告命，贞吝" },

        // 否卦
        { hexagram: "否卦", position: "初六", content: "拔茅茹，以其汇，贞吉亨" },
        { hexagram: "否卦", position: "六二", content: "包承，小人吉，大人否亨" },
        { hexagram: "否卦", position: "六三", content: "包羞" },
        { hexagram: "否卦", position: "九四", content: "有命无咎，畴离祉" },
        { hexagram: "否卦", position: "九五", content: "休否，大人吉。其亡其亡，系于苞桑" },
        { hexagram: "否卦", position: "上九", content: "倾否，先否后喜" },

        // 同人卦
        { hexagram: "同人卦", position: "初九", content: "同人于门，无咎" },
        { hexagram: "同人卦", position: "六二", content: "同人于宗，吝" },
        { hexagram: "同人卦", position: "九三", content: "伏戎于莽，升其高陵，三岁不兴" },
        { hexagram: "同人卦", position: "九四", content: "乘其墉，弗克攻，吉" },
        { hexagram: "同人卦", position: "九五", content: "同人，先号咷而后笑，大师克相遇" },
        { hexagram: "同人卦", position: "上九", content: "同人于郊，无悔" },

        // 大有卦
        { hexagram: "大有卦", position: "初九", content: "无交害，匪咎，艰则无咎" },
        { hexagram: "大有卦", position: "九二", content: "大车以载，有攸往，无咎" },
        { hexagram: "大有卦", position: "九三", content: "公用亨于天子，小人弗克" },
        { hexagram: "大有卦", position: "九四", content: "匪其彭，无咎" },
        { hexagram: "大有卦", position: "六五", content: "厥孚交如，威如，吉" },
        { hexagram: "大有卦", position: "上九", content: "自天佑之，吉无不利" },

        // 谦卦
        { hexagram: "谦卦", position: "初六", content: "谦谦君子，用涉大川，吉" },
        { hexagram: "谦卦", position: "六二", content: "鸣谦，贞吉" },
        { hexagram: "谦卦", position: "九三", content: "劳谦君子，有终吉" },
        { hexagram: "谦卦", position: "六四", content: "无不利，撝谦" },
        { hexagram: "谦卦", position: "六五", content: "不富以其邻，利用侵伐，无不利" },
        { hexagram: "谦卦", position: "上六", content: "鸣谦，利用行师，征邑国" },

        // 豫卦
        { hexagram: "豫卦", position: "初六", content: "鸣豫，凶" },
        { hexagram: "豫卦", position: "六二", content: "介于石，不终日，贞吉" },
        { hexagram: "豫卦", position: "六三", content: "盱豫，悔。迟有悔" },
        { hexagram: "豫卦", position: "九四", content: "由豫，大有得。勿疑。朋盍簪" },
        { hexagram: "豫卦", position: "六五", content: "贞疾，恒不死" },
        { hexagram: "豫卦", position: "上六", content: "冥豫，成有渝，无咎" },

        // 随卦
        { hexagram: "随卦", position: "初九", content: "官有渝，贞吉。出门交有功" },
        { hexagram: "随卦", position: "六二", content: "系小子，失丈夫" },
        { hexagram: "随卦", position: "六三", content: "系丈夫，失小子。随有求得，利居贞" },
        { hexagram: "随卦", position: "九四", content: "随有获，贞凶。有孚在道，以明，何咎" },
        { hexagram: "随卦", position: "九五", content: "孚于嘉，吉" },
        { hexagram: "随卦", position: "上六", content: "拘系之，乃从维之。王用亨于西山" },

        // 蛊卦
        { hexagram: "蛊卦", position: "初六", content: "干父之蛊，有子，考无咎，厉终吉" },
        { hexagram: "蛊卦", position: "九二", content: "干母之蛊，不可贞" },
        { hexagram: "蛊卦", position: "九三", content: "干父之蛊，小有悔，无大咎" },
        { hexagram: "蛊卦", position: "六四", content: "裕父之蛊，往见吝" },
        { hexagram: "蛊卦", position: "六五", content: "干父之蛊，用誉" },
        { hexagram: "蛊卦", position: "上九", content: "不事王侯，高尚其事" },

        // 临卦
        { hexagram: "临卦", position: "初九", content: "咸临，贞吉" },
        { hexagram: "临卦", position: "九二", content: "咸临，吉无不利" },
        { hexagram: "临卦", position: "六三", content: "甘临，无攸利。既忧之，无咎" },
        { hexagram: "临卦", position: "六四", content: "至临，无咎" },
        { hexagram: "临卦", position: "六五", content: "知临，大君之宜，吉" },
        { hexagram: "临卦", position: "上六", content: "敦临，吉无咎" },

        // 观卦
        { hexagram: "观卦", position: "初六", content: "童观，小人无咎，君子吝" },
        { hexagram: "观卦", position: "六二", content: "窥观，利女贞" },
        { hexagram: "观卦", position: "六三", content: "观我生，进退" },
        { hexagram: "观卦", position: "六四", content: "观国之光，利用宾于王" },
        { hexagram: "观卦", position: "九五", content: "观我生，君子无咎" },
        { hexagram: "观卦", position: "上九", content: "观其生，君子无咎" },

        // 噬嗑卦
        { hexagram: "噬嗑卦", position: "初九", content: "履校灭趾，无咎" },
        { hexagram: "噬嗑卦", position: "六二", content: "噬肤灭鼻，无咎" },
        { hexagram: "噬嗑卦", position: "六三", content: "噬腊肉，遇毒，小吝，无咎" },
        { hexagram: "噬嗑卦", position: "九四", content: "噬干胏，得金矢，利艰贞，吉" },
        { hexagram: "噬嗑卦", position: "六五", content: "噬干肉，得黄金，贞厉，无咎" },
        { hexagram: "噬嗑卦", position: "上九", content: "何校灭耳，凶" },

        // 贲卦
        { hexagram: "贲卦", position: "初九", content: "贲其趾，舍车而徒" },
        { hexagram: "贲卦", position: "六二", content: "贲其须" },
        { hexagram: "贲卦", position: "九三", content: "贲如濡如，永贞吉" },
        { hexagram: "贲卦", position: "六四", content: "贲如皤如，白马翰如，匪寇婚媾" },
        { hexagram: "贲卦", position: "六五", content: "贲于丘园，束帛戋戋，吝，终吉" },
        { hexagram: "贲卦", position: "上九", content: "白贲，无咎" },

        // 剥卦
        { hexagram: "剥卦", position: "初六", content: "剥床以足，蔑贞凶" },
        { hexagram: "剥卦", position: "六二", content: "剥床以辨，蔑贞凶" },
        { hexagram: "剥卦", position: "六三", content: "剥之，无咎" },
        { hexagram: "剥卦", position: "六四", content: "剥床以肤，凶" },
        { hexagram: "剥卦", position: "六五", content: "贯鱼，以宫人宠，无不利" },
        { hexagram: "剥卦", position: "上九", content: "硕果不食，君子得舆，小人剥庐" },

        // 复卦
        { hexagram: "复卦", position: "初九", content: "不远复，无祗悔，元吉" },
        { hexagram: "复卦", position: "六二", content: "休复，吉" },
        { hexagram: "复卦", position: "六三", content: "频复，厉无咎" },
        { hexagram: "复卦", position: "六四", content: "中行独复" },
        { hexagram: "复卦", position: "六五", content: "敦复，无悔" },
        { hexagram: "复卦", position: "上六", content: "迷复，凶，有灾眚。用行师，终有大败，以其国君，凶；至于十年，不克征" },

        // 无妄卦
        { hexagram: "无妄卦", position: "初九", content: "无妄，往吉" },
        { hexagram: "无妄卦", position: "六二", content: "不耕获，不菑畬，则利有攸往" },
        { hexagram: "无妄卦", position: "六三", content: "无妄之灾，或系之牛，行人之得，邑人之灾" },
        { hexagram: "无妄卦", position: "九四", content: "可贞，无咎" },
        { hexagram: "无妄卦", position: "九五", content: "无妄之疾，勿药有喜" },
        { hexagram: "无妄卦", position: "上九", content: "无妄，行有眚，无攸利" },

        // 大畜卦
        { hexagram: "大畜卦", position: "初九", content: "有厉利已" },
        { hexagram: "大畜卦", position: "九二", content: "舆说辐" },
        { hexagram: "大畜卦", position: "九三", content: "良马逐，利艰贞。曰闲舆卫，利有攸往" },
        { hexagram: "大畜卦", position: "六四", content: "童牛之牿，元吉" },
        { hexagram: "大畜卦", position: "六五", content: "豮豕之牙，吉" },
        { hexagram: "大畜卦", position: "上九", content: "何天之衢，亨" },

        // 颐卦
        { hexagram: "颐卦", position: "初九", content: "舍尔灵龟，观我朵颐，凶" },
        { hexagram: "颐卦", position: "六二", content: "颠颐，拂经，于丘颐，征凶" },
        { hexagram: "颐卦", position: "六三", content: "拂颐，贞凶，十年勿用，无攸利" },
        { hexagram: "颐卦", position: "六四", content: "颠颐吉，虎视眈眈，其欲逐逐，无咎" },
        { hexagram: "颐卦", position: "六五", content: "拂经，居贞吉，不可涉大川" },
        { hexagram: "颐卦", position: "上九", content: "由颐，厉吉，利涉大川" },

        // 大过卦
        { hexagram: "大过卦", position: "初六", content: "藉用白茅，无咎" },
        { hexagram: "大过卦", position: "九二", content: "枯杨生稊，老夫得其女妻，无不利" },
        { hexagram: "大过卦", position: "九三", content: "栋桡，凶" },
        { hexagram: "大过卦", position: "九四", content: "栋隆，吉；有它吝" },
        { hexagram: "大过卦", position: "九五", content: "枯杨生华，老妇得士夫，无咎无誉" },
        { hexagram: "大过卦", position: "上六", content: "过涉灭顶，凶，无咎" },

        // 坎卦
        { hexagram: "坎卦", position: "初六", content: "习坎，入于坎窞，凶" },
        { hexagram: "坎卦", position: "九二", content: "坎有险，求小得" },
        { hexagram: "坎卦", position: "六三", content: "来之坎坎，险且枕，入于坎窞，勿用" },
        { hexagram: "坎卦", position: "六四", content: "樽酒簋贰，用缶，纳约自牖，终无咎" },
        { hexagram: "坎卦", position: "九五", content: "坎不盈，祗既平，无咎" },
        { hexagram: "坎卦", position: "上六", content: "系用徽纆，寘于丛棘，三岁不得，凶" },

        // 离卦
        { hexagram: "离卦", position: "初九", content: "履错然，敬之无咎" },
        { hexagram: "离卦", position: "六二", content: "黄离，元吉" },
        { hexagram: "离卦", position: "九三", content: "日昃之离，不鼓缶而歌，则大耋之嗟，凶" },
        { hexagram: "离卦", position: "九四", content: "突如其来如，焚如，死如，弃如" },
        { hexagram: "离卦", position: "六五", content: "出涕沱若，戚嗟若，吉" },
        { hexagram: "离卦", position: "上九", content: "王用出征，有嘉折首，获其匪丑，无咎" },

        // 咸卦
        { hexagram: "咸卦", position: "初六", content: "咸其拇" },
        { hexagram: "咸卦", position: "六二", content: "咸其腓，凶，居吉" },
        { hexagram: "咸卦", position: "九三", content: "咸其股，执其随，往吝" },
        { hexagram: "咸卦", position: "九四", content: "贞吉悔亡，憧憧往来，朋从尔思" },
        { hexagram: "咸卦", position: "九五", content: "咸其脢，无悔" },
        { hexagram: "咸卦", position: "上六", content: "咸其辅颊舌" },

        // 恒卦
        { hexagram: "恒卦", position: "初六", content: "浚恒，贞凶，无攸利" },
        { hexagram: "恒卦", position: "九二", content: "悔亡" },
        { hexagram: "恒卦", position: "九三", content: "不恒其德，或承之羞，贞吝" },
        { hexagram: "恒卦", position: "九四", content: "田无禽" },
        { hexagram: "恒卦", position: "六五", content: "恒其德，贞，妇人吉，夫子凶" },
        { hexagram: "恒卦", position: "上六", content: "振恒，凶" },

        // 遁卦
        { hexagram: "遁卦", position: "初六", content: "遁尾，厉，勿用有攸往" },
        { hexagram: "遁卦", position: "六二", content: "执之用黄牛之革，莫之胜说" },
        { hexagram: "遁卦", position: "九三", content: "系遁，有疾厉，畜臣妾吉" },
        { hexagram: "遁卦", position: "九四", content: "好遁，君子吉，小人否" },
        { hexagram: "遁卦", position: "九五", content: "嘉遁，贞吉" },
        { hexagram: "遁卦", position: "上九", content: "肥遁，无不利" },

        // 大壮卦
        { hexagram: "大壮卦", position: "初九", content: "壮于趾，征凶，有孚" },
        { hexagram: "大壮卦", position: "九二", content: "贞吉" },
        { hexagram: "大壮卦", position: "九三", content: "小人用壮，君子用罔，贞厉。羝羊触藩，羸其角" },
        { hexagram: "大壮卦", position: "九四", content: "贞吉悔亡，藩决不羸，壮于大舆之輹" },
        { hexagram: "大壮卦", position: "六五", content: "丧羊于易，无悔" },
        { hexagram: "大壮卦", position: "上六", content: "羝羊触藩，不能退，不能遂，无攸利，艰则吉" },

        // 晋卦
        { hexagram: "晋卦", position: "初六", content: "晋如，摧如，贞吉。罔孚，裕无咎" },
        { hexagram: "晋卦", position: "六二", content: "晋如，愁如，贞吉。受兹介福，于其王母" },
        { hexagram: "晋卦", position: "六三", content: "众允，悔亡" },
        { hexagram: "晋卦", position: "九四", content: "晋如鼫鼠，贞厉" },
        { hexagram: "晋卦", position: "六五", content: "悔亡，失得勿恤，往吉，无不利" },
        { hexagram: "晋卦", position: "上九", content: "晋其角，维用伐邑，厉吉无咎，贞吝" },

        // 明夷卦
        { hexagram: "明夷卦", position: "初九", content: "明夷于飞，垂其翼。君子于行，三日不食，有攸往，主人有言" },
        { hexagram: "明夷卦", position: "六二", content: "明夷，夷于左股，用拯马壮，吉" },
        { hexagram: "明夷卦", position: "九三", content: "明夷于南狩，得其大首，不可疾贞" },
        { hexagram: "明夷卦", position: "六四", content: "入于左腹，获明夷之心，出于门庭" },
        { hexagram: "明夷卦", position: "六五", content: "箕子之明夷，利贞" },
        { hexagram: "明夷卦", position: "上六", content: "不明晦，初登于天，后入于地" },

        // 家人卦
        { hexagram: "家人卦", position: "初九", content: "闲有家，悔亡" },
        { hexagram: "家人卦", position: "六二", content: "无攸遂，在中馈，贞吉" },
        { hexagram: "家人卦", position: "九三", content: "家人嗃嗃，悔厉吉；妇子嘻嘻，终吝" },
        { hexagram: "家人卦", position: "六四", content: "富家，大吉" },
        { hexagram: "家人卦", position: "九五", content: "王假有家，勿恤吉" },
        { hexagram: "家人卦", position: "上九", content: "有孚威如，终吉" },

        // 睽卦
        { hexagram: "睽卦", position: "初九", content: "悔亡，丧马勿逐，自复；见恶人，无咎" },
        { hexagram: "睽卦", position: "九二", content: "遇主于巷，无咎" },
        { hexagram: "睽卦", position: "六三", content: "见舆曳，其牛掣，其人天且劓，无初有终" },
        { hexagram: "睽卦", position: "九四", content: "睽孤，遇元夫，交孚，厉无咎" },
        { hexagram: "睽卦", position: "六五", content: "悔亡，厥宗噬肤，往何咎" },
        { hexagram: "睽卦", position: "上九", content: "睽孤，见豕负涂，载鬼一车，先张之弧，后说之弧，匪寇婚媾，往遇雨则吉" },

        // 蹇卦
        { hexagram: "蹇卦", position: "初六", content: "往蹇，来誉" },
        { hexagram: "蹇卦", position: "六二", content: "王臣蹇蹇，匪躬之故" },
        { hexagram: "蹇卦", position: "九三", content: "往蹇来反" },
        { hexagram: "蹇卦", position: "六四", content: "往蹇来连" },
        { hexagram: "蹇卦", position: "九五", content: "大蹇朋来" },
        { hexagram: "蹇卦", position: "上六", content: "往蹇来硕，吉；利见大人" },

        // 解卦
        { hexagram: "解卦", position: "初六", content: "无咎" },
        { hexagram: "解卦", position: "九二", content: "田获三狐，得黄矢，贞吉" },
        { hexagram: "解卦", position: "六三", content: "负且乘，致寇至，贞吝" },
        { hexagram: "解卦", position: "九四", content: "解而拇，朋至斯孚" },
        { hexagram: "解卦", position: "六五", content: "君子维有解，吉；有孚于小人" },
        { hexagram: "解卦", position: "上六", content: "公用射隼，于高墉之上，获之，无不利" },

        // 损卦
        { hexagram: "损卦", position: "初九", content: "已事遄往，无咎，酌损之" },
        { hexagram: "损卦", position: "九二", content: "利贞，征凶，弗损益之" },
        { hexagram: "损卦", position: "六三", content: "三人行，则损一人；一人行，则得其友" },
        { hexagram: "损卦", position: "六四", content: "损其疾，使遄有喜，无咎" },
        { hexagram: "损卦", position: "六五", content: "或益之，十朋之龟弗克违，元吉" },
        { hexagram: "损卦", position: "上九", content: "弗损益之，无咎，贞吉，利有攸往，得臣无家" },

        // 益卦
        { hexagram: "益卦", position: "初九", content: "利用为大作，元吉，无咎" },
        { hexagram: "益卦", position: "六二", content: "或益之，十朋之龟弗克违，永贞吉。王用享于帝，吉" },
        { hexagram: "益卦", position: "六三", content: "益之用凶事，无咎。有孚中行，告公用圭" },
        { hexagram: "益卦", position: "六四", content: "中行，告公从。利用为依迁国" },
        { hexagram: "益卦", position: "九五", content: "有孚惠心，勿问元吉。有孚惠我德" },
        { hexagram: "益卦", position: "上九", content: "莫益之，或击之，立心勿恒，凶" },

        // 夬卦
        { hexagram: "夬卦", position: "初九", content: "壮于前趾，往不胜为咎" },
        { hexagram: "夬卦", position: "九二", content: "惕号，莫夜有戎，勿恤" },
        { hexagram: "夬卦", position: "九三", content: "壮于頄，有凶。君子夬夬，独行遇雨，若濡有愠，无咎" },
        { hexagram: "夬卦", position: "九四", content: "臀无肤，其行次且。牵羊悔亡，闻言不信" },
        { hexagram: "夬卦", position: "九五", content: "苋陆夬夬，中行无咎" },
        { hexagram: "夬卦", position: "上六", content: "无号，终有凶" },

        // 姤卦
        { hexagram: "姤卦", position: "初六", content: "系于金柅，贞吉，有攸往，见凶，羸豕孚蹢躅" },
        { hexagram: "姤卦", position: "九二", content: "包有鱼，无咎，不利宾" },
        { hexagram: "姤卦", position: "九三", content: "臀无肤，其行次且，厉，无大咎" },
        { hexagram: "姤卦", position: "九四", content: "包无鱼，起凶" },
        { hexagram: "姤卦", position: "九五", content: "以杞包瓜，含章，有陨自天" },
        { hexagram: "姤卦", position: "上九", content: "姤其角，吝，无咎" },

        // 萃卦
        { hexagram: "萃卦", position: "初六", content: "有孚不终，乃乱乃萃，若号，一握为笑。勿恤，往无咎" },
        { hexagram: "萃卦", position: "六二", content: "引吉，无咎，孚乃利用禴" },
        { hexagram: "萃卦", position: "六三", content: "萃如，嗟如，无攸利，往无咎，小吝" },
        { hexagram: "萃卦", position: "九四", content: "大吉，无咎" },
        { hexagram: "萃卦", position: "九五", content: "萃有位，无咎。匪孚，元永贞，悔亡" },
        { hexagram: "萃卦", position: "上六", content: "赍咨涕洟，无咎" },

        // 升卦
        { hexagram: "升卦", position: "初六", content: "允升，大吉" },
        { hexagram: "升卦", position: "九二", content: "孚乃利用禴，无咎" },
        { hexagram: "升卦", position: "九三", content: "升虚邑" },
        { hexagram: "升卦", position: "六四", content: "王用亨于岐山，吉无咎" },
        { hexagram: "升卦", position: "六五", content: "贞吉，升阶" },
        { hexagram: "升卦", position: "上六", content: "冥升，利于不息之贞" },

        // 困卦
        { hexagram: "困卦", position: "初六", content: "臀困于株木，入于幽谷，三岁不见" },
        { hexagram: "困卦", position: "九二", content: "困于酒食，朱绂方来，利用亨祀，征凶，无咎" },
        { hexagram: "困卦", position: "六三", content: "困于石，据于蒺藜，入于其宫，不见其妻，凶" },
        { hexagram: "困卦", position: "九四", content: "来徐徐，困于金车，吝，有终" },
        { hexagram: "困卦", position: "九五", content: "劓刖，困于赤绂，乃徐有说，利用祭祀" },
        { hexagram: "困卦", position: "上六", content: "困于葛藟，于臲卼，曰动悔。有悔，征吉" },

        // 井卦
        { hexagram: "井卦", position: "初六", content: "井泥不食，旧井无禽" },
        { hexagram: "井卦", position: "九二", content: "井谷射鲋，瓮敝漏" },
        { hexagram: "井卦", position: "九三", content: "井渫不食，为我心恻，可用汲，王明，并受其福" },
        { hexagram: "井卦", position: "六四", content: "井甃，无咎" },
        { hexagram: "井卦", position: "九五", content: "井洌，寒泉食" },
        { hexagram: "井卦", position: "上六", content: "井收勿幕，有孚元吉" },

        // 革卦
        { hexagram: "革卦", position: "初九", content: "巩用黄牛之革" },
        { hexagram: "革卦", position: "六二", content: "己日乃革之，征吉，无咎" },
        { hexagram: "革卦", position: "九三", content: "征凶，贞厉，革言三就，有孚" },
        { hexagram: "革卦", position: "九四", content: "悔亡，有孚改命，吉" },
        { hexagram: "革卦", position: "九五", content: "大人虎变，未占有孚" },
        { hexagram: "革卦", position: "上六", content: "君子豹变，小人革面，征凶，居贞吉" },

        // 鼎卦
        { hexagram: "鼎卦", position: "初六", content: "鼎颠趾，利出否，得妾以其子，无咎" },
        { hexagram: "鼎卦", position: "九二", content: "鼎有实，我仇有疾，不我能即，吉" },
        { hexagram: "鼎卦", position: "九三", content: "鼎耳革，其行塞，雉膏不食，方雨亏悔，终吉" },
        { hexagram: "鼎卦", position: "九四", content: "鼎折足，覆公餗，其形渥，凶" },
        { hexagram: "鼎卦", position: "六五", content: "鼎黄耳金铉，利贞" },
        { hexagram: "鼎卦", position: "上九", content: "鼎玉铉，大吉，无不利" },

        // 震卦
        { hexagram: "震卦", position: "初九", content: "震来虩虩，后笑言哑哑，吉" },
        { hexagram: "震卦", position: "六二", content: "震来厉，亿丧贝，跻于九陵，勿逐，七日得" },
        { hexagram: "震卦", position: "六三", content: "震苏苏，震行无眚" },
        { hexagram: "震卦", position: "九四", content: "震遂泥" },
        { hexagram: "震卦", position: "六五", content: "震往来厉，亿无丧，有事" },
        { hexagram: "震卦", position: "上六", content: "震索索，视矍矍，征凶。震不于其躬，于其邻，无咎。婚媾有言" },

        // 艮卦
        { hexagram: "艮卦", position: "初六", content: "艮其趾，无咎，利永贞" },
        { hexagram: "艮卦", position: "六二", content: "艮其腓，不拯其随，其心不快" },
        { hexagram: "艮卦", position: "九三", content: "艮其限，列其夤，厉薰心" },
        { hexagram: "艮卦", position: "六四", content: "艮其身，无咎" },
        { hexagram: "艮卦", position: "六五", content: "艮其辅，言有序，悔亡" },
        { hexagram: "艮卦", position: "上九", content: "敦艮，吉" },

        // 渐卦
        { hexagram: "渐卦", position: "初六", content: "鸿渐于干，小子厉，有言，无咎" },
        { hexagram: "渐卦", position: "六二", content: "鸿渐于磐，饮食衎衎，吉" },
        { hexagram: "渐卦", position: "九三", content: "鸿渐于陆，夫征不复，妇孕不育，凶；利御寇" },
        { hexagram: "渐卦", position: "六四", content: "鸿渐于木，或得其桷，无咎" },
        { hexagram: "渐卦", position: "九五", content: "鸿渐于陵，妇三岁不孕，终莫之胜，吉" },
        { hexagram: "渐卦", position: "上九", content: "鸿渐于陆，其羽可用为仪，吉" },

        // 归妹卦
        { hexagram: "归妹卦", position: "初九", content: "归妹以娣，跛能履，征吉" },
        { hexagram: "归妹卦", position: "九二", content: "眇能视，利幽人之贞" },
        { hexagram: "归妹卦", position: "六三", content: "归妹以须，反归以娣" },
        { hexagram: "归妹卦", position: "九四", content: "归妹愆期，迟归有时" },
        { hexagram: "归妹卦", position: "六五", content: "帝乙归妹，其君之袂，不如其娣之袂良，月几望，吉" },
        { hexagram: "归妹卦", position: "上六", content: "女承筐无实，士刲羊无血，无攸利" },

        // 丰卦
        { hexagram: "丰卦", position: "初九", content: "遇其配主，虽旬无咎，往有尚" },
        { hexagram: "丰卦", position: "六二", content: "丰其蔀，日中见斗，往得疑疾，有孚发若，吉" },
        { hexagram: "丰卦", position: "九三", content: "丰其沛，日中见沫，折其右肱，无咎" },
        { hexagram: "丰卦", position: "九四", content: "丰其蔀，日中见斗，遇其夷主，吉" },
        { hexagram: "丰卦", position: "六五", content: "来章，有庆誉，吉" },
        { hexagram: "丰卦", position: "上六", content: "丰其屋，蔀其家，窥其户，阒其无人，三岁不见，凶" },

        // 旅卦
        { hexagram: "旅卦", position: "初六", content: "旅琐琐，斯其所取灾" },
        { hexagram: "旅卦", position: "六二", content: "旅即次，怀其资，得童仆贞" },
        { hexagram: "旅卦", position: "九三", content: "旅焚其次，丧其童仆，贞厉" },
        { hexagram: "旅卦", position: "九四", content: "旅于处，得其资斧，我心不快" },
        { hexagram: "旅卦", position: "六五", content: "射雉一矢亡，终以誉命" },
        { hexagram: "旅卦", position: "上九", content: "鸟焚其巢，旅人先笑后号啕。丧牛于易，凶" },

        // 巽卦
        { hexagram: "巽卦", position: "初六", content: "进退，利武人之贞" },
        { hexagram: "巽卦", position: "九二", content: "巽在床下，用史巫纷若，吉无咎" },
        { hexagram: "巽卦", position: "九三", content: "频巽，吝" },
        { hexagram: "巽卦", position: "六四", content: "悔亡，田获三品" },
        { hexagram: "巽卦", position: "九五", content: "贞吉悔亡，无不利。无初有终，先庚三日，后庚三日，吉" },
        { hexagram: "巽卦", position: "上九", content: "巽在床下，丧其资斧，贞凶" },

        // 兑卦
        { hexagram: "兑卦", position: "初九", content: "和兑，吉" },
        { hexagram: "兑卦", position: "九二", content: "孚兑，吉，悔亡" },
        { hexagram: "兑卦", position: "六三", content: "来兑，凶" },
        { hexagram: "兑卦", position: "九四", content: "商兑，未宁，介疾有喜" },
        { hexagram: "兑卦", position: "九五", content: "孚于剥，有厉" },
        { hexagram: "兑卦", position: "上六", content: "引兑" },

        // 涣卦
        { hexagram: "涣卦", position: "初六", content: "用拯马壮，吉" },
        { hexagram: "涣卦", position: "九二", content: "涣奔其机，悔亡" },
        { hexagram: "涣卦", position: "六三", content: "涣其躬，无悔" },
        { hexagram: "涣卦", position: "六四", content: "涣其群，元吉。涣有丘，匪夷所思" },
        { hexagram: "涣卦", position: "九五", content: "涣汗其大号，涣王居，无咎" },
        { hexagram: "涣卦", position: "上九", content: "涣其血，去逖出，无咎" },

        // 节卦
        { hexagram: "节卦", position: "初九", content: "不出户庭，无咎" },
        { hexagram: "节卦", position: "九二", content: "不出门庭，凶" },
        { hexagram: "节卦", position: "六三", content: "不节若，则嗟若，无咎" },
        { hexagram: "节卦", position: "六四", content: "安节，亨" },
        { hexagram: "节卦", position: "九五", content: "甘节，吉，往有尚" },
        { hexagram: "节卦", position: "上六", content: "苦节，贞凶，悔亡" },

        // 中孚卦
        { hexagram: "中孚卦", position: "初九", content: "虞吉，有它不燕" },
        { hexagram: "中孚卦", position: "九二", content: "鸣鹤在阴，其子和之。我有好爵，吾与尔靡之" },
        { hexagram: "中孚卦", position: "六三", content: "得敌，或鼓或罢，或泣或歌" },
        { hexagram: "中孚卦", position: "六四", content: "月几望，马匹亡，无咎" },
        { hexagram: "中孚卦", position: "九五", content: "有孚挛如，无咎" },
        { hexagram: "中孚卦", position: "上九", content: "翰音登于天，贞凶" },

        // 小过卦
        { hexagram: "小过卦", position: "初六", content: "飞鸟以凶" },
        { hexagram: "小过卦", position: "六二", content: "过其祖，遇其妣；不及其君，遇其臣；无咎" },
        { hexagram: "小过卦", position: "九三", content: "弗过防之，从或戕之，凶" },
        { hexagram: "小过卦", position: "九四", content: "无咎，弗过遇之。往厉必戒，勿用永贞" },
        { hexagram: "小过卦", position: "六五", content: "密云不雨，自我西郊，公弋取彼在穴" },
        { hexagram: "小过卦", position: "上六", content: "弗遇过之，飞鸟离之，凶，是谓灾眚" },

        // 既济卦
        { hexagram: "既济卦", position: "初九", content: "曳其轮，濡其尾，无咎" },
        { hexagram: "既济卦", position: "六二", content: "妇丧其茀，勿逐，七日得" },
        { hexagram: "既济卦", position: "九三", content: "高宗伐鬼方，三年克之，小人勿用" },
        { hexagram: "既济卦", position: "六四", content: "繻有衣袽，终日戒" },
        { hexagram: "既济卦", position: "九五", content: "东邻杀牛，不如西邻之禴祭，实受其福" },
        { hexagram: "既济卦", position: "上六", content: "濡其首，厉" },

        // 未济卦
        { hexagram: "未济卦", position: "初六", content: "濡其尾，吝" },
        { hexagram: "未济卦", position: "九二", content: "曳其轮，贞吉" },
        { hexagram: "未济卦", position: "六三", content: "未济，征凶，利涉大川" },
        { hexagram: "未济卦", position: "九四", content: "贞吉，悔亡，震用伐鬼方，三年有赏于大国" },
        { hexagram: "未济卦", position: "六五", content: "贞吉，无悔，君子之光，有孚，吉" },
        { hexagram: "未济卦", position: "上九", content: "有孚于饮酒，无咎，濡其首，有孚失是" }
    ];
});
