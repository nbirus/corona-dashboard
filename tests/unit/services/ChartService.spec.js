import * as ChartService from '@/services/ChartService';
jest.mock('badc-styleguide/theme/colors', () => {
    return {
        primary: {
            base: '#565656',
            lighten1: '#676767',
            darken1: '#454545',
            lighten2: '#787878',
            darken2: '#343434',
            lighten3: '#898989',
            darken3: '#232323',
        }
    };
});

describe('ChartService', () => {
    // TODO
    // it('Should test formatChartData()', async () => {
    //     expect(await ChartService.formatChartData([], 'type')).toEqual({ fontSize: 16 });
    // });

    it('Should test default options for all charts', () => {
        expect(ChartService.defaults.textStyle()).toEqual({ fontSize: 16 });
        expect(ChartService.defaults.textStyle('title')).toEqual({ lineHeight: 14, fontSize: 20 });
        expect(ChartService.defaults.textStyle('subtitle')).toEqual({ lineHeight: 10, fontSize: 14 });
    });

    it('Should test chart colors', () => {
        expect(ChartService.chartColors).toEqual({
            ytb: {
                from: 'aqua',
                to: 'orange',
            },
            ytp: {
                from: 'yellow',
                to: 'purple',
            },
            atb: {
                from: 'aqua',
                to: 'blue',
            },
            btr: {
                from: 'blue',
                to: 'red',
            },
        });
    });

    it('Should test getColors()', () => {
        expect(ChartService.getColors('ytp', 2)).toEqual([ '#ffff00', '#800080' ]);
        expect(ChartService.getColors('primary', 3)).toEqual([ '#676767', '#565656', '#454545' ]);
        expect(ChartService.getColors('primary', 7)).toEqual([ '#787878', '#6d6d6d', '#616161', '#565656', '#4b4b4b', '#3f3f3f', '#343434' ]);
        expect(ChartService.getColors('primary', 10)).toEqual([ '#898989', '#7e7e7e', '#727272', '#676767' , '#5c5c5c', '#505050', '#454545', '#3a3a3a', '#2e2e2e', '#232323' ]);
    });
});