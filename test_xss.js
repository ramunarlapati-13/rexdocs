import { escapeHtml } from './utils.js';
import assert from 'assert';

console.log("Running XSS escaping tests...");

// Test cases for XSS payloads
const testCases = [
    {
        input: '<script>alert("xss")</script>',
        expected: '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;',
        desc: 'Script tag injection'
    },
    {
        input: '"><img src=x onerror=alert(1)>',
        expected: '&quot;&gt;&lt;img src=x onerror=alert(1)&gt;',
        desc: 'Attribute breakout with img tag'
    },
    {
        input: "cat's folder & name",
        expected: 'cat&#039;s folder &amp; name',
        desc: 'Single quote and ampersand escaping'
    },
    {
        input: null,
        expected: '',
        desc: 'Null input'
    },
    {
        input: undefined,
        expected: '',
        desc: 'Undefined input'
    },
    {
        input: 12345,
        expected: '12345',
        desc: 'Numeric input'
    },
    {
        input: 'https://example.com/image.png" onload="alert(1)"',
        expected: 'https://example.com/image.png&quot; onload=&quot;alert(1)&quot;',
        desc: 'Thumbnail payload escaping'
    },
    {
        input: 'fa-file" onerror="alert(1)"',
        expected: 'fa-file&quot; onerror=&quot;alert(1)&quot;',
        desc: 'Icon class payload escaping'
    }
];

let passed = 0;
let failed = 0;

for (const tc of testCases) {
    const result = escapeHtml(tc.input);
    try {
        assert.strictEqual(result, tc.expected);
        console.log(`[PASS] ${tc.desc}`);
        passed++;
    } catch (err) {
        console.error(`[FAIL] ${tc.desc}`);
        console.error(`  Expected: ${tc.expected}`);
        console.error(`  Actual:   ${result}`);
        failed++;
    }
}

if (failed > 0) {
    console.error(`\nTest suite failed: ${failed} failure(s).`);
    process.exit(1);
} else {
    console.log(`\nAll ${passed} tests passed successfully!`);
}
