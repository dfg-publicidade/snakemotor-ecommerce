declare var $: any;
export class Util {
	static loadScript(url: string, async?: boolean) {
		let node = document.createElement('script');
		node.src = url;
		node.type = 'text/javascript';
		node.async = async ? async : false;

		if (document.querySelectorAll('[src="' + url + '"]').length === 0) {
			document.getElementsByTagName('head')[0].appendChild(node);
		}
	}

	static loadScriptBody(url: string) {
		let node = document.createElement('script');
		node.src = url;
		node.type = 'text/javascript';

		if (document.querySelectorAll('[src="' + url + '"]').length === 0) {
			document.getElementsByTagName('body')[0].appendChild(node);
		}
	}

	static loadCss(url: string) {
		let node = document.createElement('link');
		node.rel = 'stylesheet';
		node.type = 'text/css';
		node.href = url;
		node.media = 'all';
		node.crossOrigin = 'true';
		if (document.querySelectorAll('[href="' + url + '"]').length === 0) {
			document.getElementsByTagName('head')[0].appendChild(node);
		}
	}

	static linkYoutubeEmbed(): string {
		return 'https://www.youtube.com/embed';
	}
}
