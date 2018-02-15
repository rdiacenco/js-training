/*
 * Copyright (c) 2018
 */

/*
 * Author: Roxana Diacenco
 *
 * Created on: Tue Feb 15 2018
 */

/**
 * Write a program that prints the numbers from 1 to 100.
 * But for multiples of three print “Java” instead of the number and for the multiples of five print “git ”.
 * For numbers which are multiples of both three and five print “JavaScript”.
 *
 */
function printNumbers(upperLimitNo) {
    for(var i = 1; i <= upperLimitNo; i++) {
        var printMessage = i;
        if(i % 3 === 0) {
            printMessage = 'Java';
            if(i % 5 === 0) {
                printMessage = printMessage + 'Script';
            }
        } else if(i % 5 === 0) {
            printMessage = 'Script';
        }
        console.log('Number', i, ' -> ', printMessage);
    }
}