export const themeService = {
    setTheme
}

function setTheme(i) {
    let theme = themes[i];
    for (let key in theme) {
        document.documentElement.style.setProperty(key, theme[key]);
    }
}

const themes = [
    {
        '--primary-color': '#4F4846',
        '--secondary-color': '#FDF8F5',
        '--bold-color': '#266150',
        '--bold-color-hover': '#144436',
        '--alt-color1': '#E8CEBF',
        '--alt-color2': '#DDAF94',
    },
    {
        '--primary-color': '#3C403D',
        '--secondary-color': '#FFFFFF',
        '--bold-color': '#39603D',
        '--bold-color-hover': '#224726',
        '--alt-color1': '#DADED4',
        '--alt-color2': '#A3BCB6',
    },
    {

        '--primary-color': '#8E8D8A',
        '--secondary-color': '#EAE7DC',
        '--bold-color': '#E85A4F',
        '--bold-color-hover': '#bd3c33',
        '--alt-color1': '#D8C3A5',
        '--alt-color2': '#E98074',
    },
    {

        '--primary-color': '#05386B',
        '--secondary-color': '#EDF5E1',
        '--bold-color': '#379683',
        '--bold-color-hover': '#278673',
        '--alt-color1': '#5CDB95',
        '--alt-color2': '#8EE4AF',
    },
    {
// !!!
        '--primary-color': '#0B0C10',
        '--secondary-color': '#C5C6C7',
        '--bold-color': '#66FCF1',
        '--bold-color-hover': '#46DCD1',
        '--alt-color1': '#1F2833',
        '--alt-color2': '#45A29E',
    },
    {

        '--primary-color': '#8E8D8A',
        '--secondary-color': '#EAE7DC',
        '--bold-color': '#E85A4F',
        '--bold-color-hover': '#bd3c33',
        '--alt-color1': '#D8C3A5',
        '--alt-color2': '#E98074',
    },
]