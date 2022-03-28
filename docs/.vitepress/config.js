const sidebarApropos = [{ text: 'En détails', link: '/apropos/' }]
const sidebarContact = [{ text: 'contact', link: '/contact' }]

module.exports = {
    title: 'CartONG',
    description: 'Documentation de la configuration du module GPS de précision',

    base: '/AMI/',

    themeConfig: {
        nav: [
            { text: 'Home', link: '/'},
            { text: 'à propos', link: '/apropos/' },
            { text: 'Contact', link: '/contact' }
        ],
        sidebar: {
            '/apropos/': sidebarApropos,
            '/contact' : sidebarContact
        }
    }
}