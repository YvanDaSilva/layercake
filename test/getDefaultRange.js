/* globals describe it */
import * as assert from 'assert';
import getDefaultRange from '../src/settings/getDefaultRange.js';
import defaultReverses from '../src/settings/defaultReverses.js';


const name = 'getDefaultRange';

const w = 900;
const h = 500;

const tests = [

	/* --------------------------------------------
	 * Defaults
	 */
	{ args: ['x', w, h, defaultReverses.x], expected: [0, w] },
	{ args: ['y', w, h, defaultReverses.y], expected: [h, 0] },
	{ args: ['z', w, h, defaultReverses.z], expected: [0, w] },
	{ args: ['r', w, h, defaultReverses.r], expected: [1, 25] },

	/* --------------------------------------------
	 * Reverse it
	 */
	{ args: ['x', w, h, !defaultReverses.x], expected: [w, 0] },
	{ args: ['y', w, h, !defaultReverses.y], expected: [0, h] },
	{ args: ['z', w, h, !defaultReverses.z], expected: [w, 0] },
	{ args: ['r', w, h, !defaultReverses.r], expected: [25, 1] },

	/* --------------------------------------------
	 * Set a manual default
	 */
	{ args: ['x', w, h, false, [-100, 100]], expected: [-100, 100] },
	{ args: ['y', w, h, false, [-100, 100]], expected: [-100, 100] },
	{ args: ['z', w, h, false, [-100, 100]], expected: [-100, 100] },
	{ args: ['r', w, h, false, [-100, 100]], expected: [-100, 100] },

	/* --------------------------------------------
	 * Set a manual default, with reverse true, which should have no effect
	 */
	{ args: ['x', w, h, true, [-100, 100]], expected: [-100, 100] },
	{ args: ['y', w, h, true, [-100, 100]], expected: [-100, 100] },
	{ args: ['z', w, h, true, [-100, 100]], expected: [-100, 100] },
	{ args: ['r', w, h, true, [-100, 100]], expected: [-100, 100] },

	/* --------------------------------------------
	 * Functions!
	 */
	{ args: ['x', w, h, false, ({ width, height }) => [0, width / 2]], expected: [0, w / 2] },
	{ args: ['y', w, h, false, ({ width, height }) => [0, height / 2]], expected: [0, h / 2] },
	{ args: ['z', w, h, false, ({ width, height }) => [0, width / 2]], expected: [0, w / 2] },
	{ args: ['r', w, h, false, ({ width, height }) => [width / 2, height / 2]], expected: [w / 2, h / 2] },

	/* --------------------------------------------
	 * Functions, with reverse true, which should have no effect
	 */
	{ args: ['x', w, h, true, ({ width, height }) => [0, width / 2]], expected: [0, w / 2] },
	{ args: ['y', w, h, true, ({ width, height }) => [0, height / 2]], expected: [0, h / 2] },
	{ args: ['z', w, h, true, ({ width, height }) => [0, width / 2]], expected: [0, w / 2] },
	{ args: ['r', w, h, true, ({ width, height }) => [width / 2, height / 2]], expected: [w / 2, h / 2] }
];

describe(name, () => {
	tests.forEach(test => {
		describe(JSON.stringify(test.args), () => {
			it(`should equal ${JSON.stringify(test.expected)}`, () => {
				const actual = getDefaultRange(...test.args);
				assert.deepStrictEqual(actual, test.expected);
			});
		});
	});
});