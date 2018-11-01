function dateAgoPL(stamp) {
    let diff = new Date() - stamp;
    let calc;
    let dateConv;
    let dateConvShort;
    let numDate = getNumDate(stamp);


    if(diff<3600000) { //1h
        if(diff<120000) {
            dateConv = 'Minutę temu';
            dateConvShort = '1m';
        } else {
            calc = Math.floor(diff/60000);
            dateConv = calc+' min. temu';
            dateConvShort = calc+'m';
        }
    }
    else if(diff<86400000) { //24h
        if(diff<7200000) {
            dateConv = '1 godz. temu';
            dateConvShort = '1h';
        } else {
            calc = Math.floor(diff/3600000);
            dateConv = calc+' godz. temu';
            dateConvShort = calc+'h';
        }
    }
    else if(diff<604800000) { //1w
        let diffConv = Math.floor(diff/86400000);
        if(diffConv===1) {
            dateConv = 'wczoraj';
            dateConvShort = '1d';
        } else {
            dateConv = diffConv+' dni temu';
            dateConvShort = diffConv+'d';
        }
    }
    else {
        dateConv = numDate;
        dateConvShort = numDate;
    }


    return {full: dateConv, short: dateConvShort, num: numDate};
}


export default dateAgoPL;



function getNumDate(stamp) {
    let day = stamp.getDate();
    let month = stamp.getMonth()+1;
    let year = stamp.getFullYear();
    if(day<10) {
        day='0'+day;
    }
    if(month<10) {
        month = '0'+month;
    }

    return day+'.'+month+'.'+year;
}