export const menus = [
  {
      'name': 'Dashboard',
      'icon': 'home',
      'link': `/auth/dashboard?id=${sessionStorage.getItem("userid")}`,
      'open': false,
      // 'chip': { 'value': 1, 'color': 'accent' },
  },
  {
      'name': 'Concessionaires',
      'icon': 'people',
      'link': false,
      'open': false,
      'sub': [
        {
          'name': 'View Concessionaires',
          'link': 'pages/viewConcessionaires',
          'icon': 'remove_red_eye',
          'chip': false,
          'open': false,
        },
        // {
        //   'name': 'Manage Concessionaires',
        //   'link': 'material-widgets/buttons',
        //   'icon': 'file_upload',
        //   'chip': false,
        //   'open': false,
        // }

      ]
      // 'sub': [
      //     {
      //         'name': 'Buttons',
      //         'link': 'material-widgets/buttons',
      //         'icon': 'indeterminate_check_box',
      //         'chip': false,
      //         'open': false,
      //     },
      //     {
      //         'name': 'List',
      //         'link': 'material-widgets/list',
      //         'icon': 'list',
      //         'chip': false,
      //         'open': false,
      //     },
      //     {

      //         'name': 'Stepper',
      //         'link': 'material-widgets/stepper',
      //         'icon': 'view_week',
      //         'chip': false,
      //         'open': false,

      //     },
      //     {
      //         'name': 'Expansion',
      //         'link': 'material-widgets/expansion',
      //         'icon': 'web_aaset',
      //         'chip': false,
      //         'open': false,
      //     },
      //     {
      //         'name': 'Progress Spinner',
      //         'link': 'material-widgets/spinner',
      //         'icon': 'cached',
      //         'chip': false,
      //         'open': false,
      //     },
      //     {
      //         'name': 'Cards',
      //         'link': 'material-widgets/cards',
      //         'icon': 'crop_16_9',
      //         'chip': false,
      //         'open': false,
      //     },
      //     {
      //         'name': 'Icons',
      //         'link': 'material-widgets/icons',
      //         'icon': 'gif',
      //         'chip': false,
      //         'open': false,
      //     },
      //     {

      //         'name': 'AutoComplete',
      //         'link': 'material-widgets/autocomplete',
      //         'icon': 'get_app',
      //         'chip': false,
      //         'open': false,
      //     },
      //     {
      //         'name': 'CheckBox',
      //         'link': 'material-widgets/checkbox',
      //         'icon': 'check_box',
      //         'chip': false,
      //         'open': false,
      //     },
      //     {
      //         'name': 'DatePicker',
      //         'link': 'material-widgets/datepicker',
      //         'icon': 'date_range',
      //         'chip': false,
      //         'open': false,
      //     },

      //     {
      //         'name': 'Slider',
      //         'link': 'material-widgets/slider',
      //         'icon': 'keyboard_tab',
      //         'chip': false,
      //         'open': false,
      //     },
      //     {
      //         'name': 'Slide Toggle',
      //         'link': 'material-widgets/slide-toggle',
      //         'icon': 'album',
      //         'chip': false,
      //         'open': false,
      //     },
      //     {
      //         'name': 'Menu',
      //         'icon': 'menu',
      //         'link': 'material-widgets/menu',
      //         'chip': false,
      //         'open': false,
      //     },
      //     {
      //         'name': 'Progress Bar',
      //         'link': 'material-widgets/progress-bar',
      //         'icon': 'trending_flat',
      //         'chip': false,
      //         'open': false,
      //     },
      //     {
      //         'name': 'Input',
      //         'icon': 'input',
      //         'link': 'material-widgets/input',
      //         'open': false,
      //     },
      //     {
      //         'name': 'Radio',
      //         'icon': 'radio_button_checked',
      //         'link': 'material-widgets/radio',
      //         'chip': false,
      //         'open': false,
      //     },
      //     {
      //         'name': 'Select',
      //         'icon': 'select_all',
      //         'link': 'material-widgets/select',
      //         'open': false,
      //     },
      // ]
  },
  // {
  //     'name'   : 'Forms',
  //     'icon'   : 'mode_edit',
  //     'open'   : false,
  //     'link'   : false,
  //     'sub'    :  [
  //                     {
  //                         'name': 'Template Driven',
  //                         'icon': 'mode_edit',
  //                         'open'   : false,
  //                         'link':'forms/template_forms'
  //                     },
  //                     {
  //                         'name': 'Reactive Forms',
  //                         'icon': 'text_fields',
  //                         'open'   : false,
  //                         'link':'forms/reactive_forms'
  //                     }
  //                 ]
  // },
  {
      'name': ' Smart Meters',
      'icon': 'watch_later',
      'link': false,
      'open': false,
      'sub': [
          {
            'name': 'View Smart Meters',
            'icon': 'watch_later',
            'link': 'pages/viewSmartMeters',
            'open': false,
          },
          {
              'name': 'Read Smart Meters',
              'icon': 'filter_list',
              'link': 'pages/readSmartMeters',
              'open': false,
          },

          // {
          //     'name': 'Sub Module 3',
          //     'icon': '',
          //     'link': 'tables/responsive',
          //     'open': false,
          // }
      ]

  },
  {
      'name': 'Rates',
      'icon': 'attach_money',
      'link': 'pages/viewRates',
      'open': false,
      // 'sub': [
      //   {
      //     'name': 'View Module 1',
      //     'icon': '',
      //     'link': 'tables/responsive',
      //     'open': false,
      //   },
      //   {
      //     'name': 'Sub Module 2',
      //     'icon': '',
      //     'link': 'tables/responsive',
      //     'open': false,
      //   }
      // ]
  },
  // {
  //   'name': 'Web Socket',
  //   'icon': 'attach_money',
  //   'link': 'pages/websocket',
  //   'open': false,
  // }
];
