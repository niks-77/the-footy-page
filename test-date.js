import { convertRelativeToAbsoluteDate } from './backend/src/utils/dateUtils.js';
import { DATE_OPTIONS } from './backend/src/constants/index.js';

console.log('Testing date conversion:');
console.log('Yesterday:', convertRelativeToAbsoluteDate(DATE_OPTIONS.YESTERDAY));
console.log('Today:', convertRelativeToAbsoluteDate(DATE_OPTIONS.TODAY));
console.log('Tomorrow:', convertRelativeToAbsoluteDate(DATE_OPTIONS.TOMORROW));

const today = new Date().toISOString().split('T')[0];
if (convertRelativeToAbsoluteDate(DATE_OPTIONS.TODAY) === today) {
    console.log('SUCCESS: Today matches');
} else {
    console.log('FAILURE: Today mismatch');
}
