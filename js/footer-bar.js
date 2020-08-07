class FooterBar extends HTMLElement {

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <footer class="page-footer footerColor">
                <div class="container">
                    <div class="row">
                    <div class="col l6 s12">
                        <h5 class="white-text">FootballX</h5>
                        <p class="grey-text text-lighten-4">FootbalX is PWA about football around the world.</p>
                    </div>
                    <div class="col l4 offset-l2 s12">
                        <h5 class="white-text">Links</h5>
                        <ul>
                        <li><a class="grey-text text-lighten-3" href="https://twitter.com/koniksaputra">Twitter</a></li>
                        <li><a class="grey-text text-lighten-3" href="https://instagram.com/koniksaputra">Instagram</a></li>
                        <li><a class="grey-text text-lighten-3" href="https://github.com/nicktra">Github</a></li>
                        <li><a class="grey-text text-lighten-3" href="https://linkedin.com/in/koniksaputra">LinkedIn</a></li>
                        </ul>
                    </div>
                    </div>
                </div>
                <div class="footer-copyright">
                    <div class="container">
                    © 2020 Copyright
                    <a class="grey-text text-lighten-4 right" href="#!">Konik Saputra</a>
                    </div>
                </div>
            </footer>
        `;
    }

}

customElements.define("footer-bar", FooterBar);