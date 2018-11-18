export default function(date) {
    return Object.prototype.toString.call(date) === '[object Date]';
}