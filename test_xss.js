import { escapeHtml, renderCategoryBadge } from './utils.js';
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

console.log("\nRunning renderCategoryBadge tests...");

const badgeTestCases = [
    {
        name: 'Legal',
        color: '#6366f1',
        className: undefined,
        expected: '<span class="tag-badge" style="background: #6366f120; color: #6366f1">Legal</span>',
        desc: 'Default className tag-badge and standard category'
    },
    {
        name: 'Work & Personal <script>',
        color: '#ec4899',
        className: 'badge',
        expected: '<span class="badge" style="background: #ec489920; color: #ec4899">Work &amp; Personal &lt;script&gt;</span>',
        desc: 'Custom className badge and escaped category name'
    },
    {
        name: 'Invoices',
        color: '" onerror="alert(1)',
        className: 'tag-badge',
        expected: '<span class="tag-badge" style="background: &quot; onerror=&quot;alert(1)20; color: &quot; onerror=&quot;alert(1)">&lt;span&gt;Invoices</span>',
        nameOverride: '<span>Invoices',
        desc: 'Escapes color and name against attribute injection'
    }
];

for (const tc of badgeTestCases) {
    const categoryName = tc.nameOverride || tc.name;
    const result = tc.className !== undefined
        ? renderCategoryBadge(categoryName, tc.color, tc.className)
        : renderCategoryBadge(categoryName, tc.color);
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
