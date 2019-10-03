export const Scroll = {
    showScroll:function(){
       return window.document.getElementsByTagName('body').item(0).classList.add('overflow');
    },
    hideScroll:function(){
       return  window.document.getElementsByTagName('body').item(0).classList.remove('overflow');
    }
}