module.exports = (playerScore, parScore) => {
    let color;
    switch (playerScore - parScore) {
        case 1:
            color = '#ebc7c5';
            break;
        case 2:
            color = '#d18d8a';
            break;
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
            color = '#b8a6de'
            break;
        case -1:
            color = 'lightgreen';
            break;
        case -2:
            color = 'lightblue';
            break;
        default:
            color = 'white';
    }
    return color;
}