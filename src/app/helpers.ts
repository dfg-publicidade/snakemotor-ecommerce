declare var $: any;
declare var bootstrap: any;

class Helpers {
    public static initLayout() {
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 500);
    }

    static scrollPageTop() {
        $('html, body').animate({ scrollTop: $('body').offset().top }, 300);
    }

    static toastMessage() {
        $('.toast').toast('show');
    }
}

export default Helpers;
