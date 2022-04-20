import { createTheme } from '@material-ui/core/styles';

const baseTheme = createTheme({
     typography: {
       fontFamily: "'Work Sans', sans-serif",
       fontSize: 14,
       fontFamilySecondary: "'Roboto Condensed', sans-serif"
     }
});

const theme = createTheme({
     ...baseTheme,
     palette: {
          type: 'light',
          primary: {
            main: '#103160',
          },
          secondary: {
            main: '#f44336',
          },
          background: {
            default: '#fafafa',
            paper: '#ffffff',
          },
          text: {
            primary: 'rgba(45,45,45,0.87)',
            secondary: 'rgba(45,45,45,0.54)',
            disabled: 'rgba(45,45,45,0.38)',
            hint: 'rgba(45,45,45,0.38)',
          },
          warning: {
            main: '#ff9701',
          },
          info: {
            main: '#2196f2',
          },
          success: {
            main: '#4caf51',
          },
          divider: 'rgba(0,0,0,0.13)'
     },

});

const darkTheme = createTheme({
     ...baseTheme,
     palette: {
       type: 'dark',
       primary: {
         main: '#053e94',
       },
       secondary: {
         main: '#f44336',
       },
       warning: {
         main: '#ff9701',
       },
       info: {
         main: '#2196f2',
       },
       success: {
         main: '#4caf51',
       },
       divider: 'rgba(0,0,0,0.13)',
       background: {
         paper: '#031c3b',
         default: '#06172d',
       },
       error: {
         main: '#f44337',
       },
     }
});

export {theme, darkTheme};


// import { createTheme } from '@material-ui/core/styles';

// const baseTheme = createTheme({
//      typography: {
//        fontFamily: "'Work Sans', sans-serif",
//        fontSize: 14,
//        fontFamilySecondary: "'Roboto Condensed', sans-serif"
//      }
// });

// const theme = createTheme({
//      ...baseTheme,
//      palette: {
//           type: 'light',
//           primary: {
//             main: '#103160',
//           },
//           secondary: {
//             main: '#f44336',
//           },
//           background: {
//             default: '#fafafa',
//             paper: '#ffffff',
//           },
//           text: {
//             primary: 'rgba(45,45,45,0.87)',
//             secondary: 'rgba(45,45,45,0.54)',
//             disabled: 'rgba(45,45,45,0.38)',
//             hint: 'rgba(45,45,45,0.38)',
//           },
//           warning: {
//             main: '#ff9701',
//           },
//           info: {
//             main: '#2196f2',
//           },
//           success: {
//             main: '#4caf51',
//           },
//           divider: 'rgba(0,0,0,0.13)'
//      }
// });

// const darkTheme = createTheme({
//      ...baseTheme,
//      palette: {
//        type: 'dark',
//        primary: {
//          main: '#053e94',
//        },
//        secondary: {
//          main: '#f44336',
//        },
//        warning: {
//          main: '#ff9701',
//        },
//        info: {
//          main: '#2196f2',
//        },
//        success: {
//          main: '#4caf51',
//        },
//        divider: 'rgba(0,0,0,0.13)',
//        background: {
//          paper: '#031c3b',
//          default: '#06172d',
//        },
//        error: {
//          main: '#f44337',
//        },
//      }
// });

// export {theme, darkTheme};