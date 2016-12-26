const functionCall = require('reduce-function-call');
import * as postcss from 'postcss';

export interface Options {
    columns: number;
    maxWidth: number;
    gutter: number;
    legacy: boolean;
}

const rxValue = /\s*(\d+)\s*\/\s*(\d+)\s*/;


export default function getProps(opts: Options) {
    const columnWidth = (opts.maxWidth - ((opts.columns -1 ) * opts.gutter)) / opts.columns;
    function gridWidth(span: number, cols: number): number {
        const width = span * columnWidth + (span -1 ) * opts.gutter;
        const container = cols * columnWidth + (cols -1) * opts.gutter;
        return +((width  / container) * 100).toFixed(5) * 1;
    }

    function gutterWidth (cols: number) {
        var width = cols * columnWidth + (cols - 1) * opts.gutter;
        return +((opts.gutter / width) * 100).toFixed(5) * 1;
    }

    function callGridWidth(value: string) {
        return functionCall(value, "grid-width", (body: string)=>
            callGridColumn(body, (span, columns)=> 
                gridWidth(+RegExp.$1, +RegExp.$2) + '%'));
    }

    function callGridGutter(value: string): string {
        return functionCall(value, "grid-gutter", function(body:number) {
            return gutterWidth(body) + "%";
        });
    }

    function callGridColumn(value: string, fn: ((span: number, columns: number) => void)) {
        if (rxValue.exec(value)) {
            return fn(+RegExp.$1, +RegExp.$2);
        } else {
            throw new Error('Invalid declaration');
        }
    }

    return { callGridWidth, callGridGutter, gridWidth, gutterWidth, callGridColumn };
};

        




