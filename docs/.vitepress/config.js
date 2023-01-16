const sidebarApropos = [{ text: 'En détails', link: '/apropos/' }]
const sidebarContact = [{ text: 'contact', link: '/contact' }]

module.exports = {
    title: 'CartONG',
    description: 'Documentation de la configuration du module GPS de précision',

    base: '/AMI/',

    themeConfig: {
        // Navbar Link
        nav: [
            { text: 'Home', link: '/'},
            // Dropdown Menu
            {
              text: 'Guide',
               items: [
                { text: 'matériel', link: '/materiel' },
                { text: 'logiciel', link: '/logiciel' }
               ]
            },
            { text: 'à propos', link: '/apropos/' },
            { text: 'Contact', link: '/contact' }
        ],
        sidebar: {
            '/apropos/': sidebarApropos,
            '/contact' : sidebarContact
        }
    }
}