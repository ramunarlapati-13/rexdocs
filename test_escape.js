import assert from 'assert';
import { escapeHtml } from './utils.js';

console.log('Running XSS escape unit tests...');

// Test 1: Null and undefined inputs
assert.strictEqual(escapeHtml(null), '');
assert.strictEqual(escapeHtml(undefined), '');

// Test 2: Standard strings
assert.strictEqual(escapeHtml('Hello World'), 'Hello World');
assert.strictEqual(escapeHtml(123), '123');

// Test 3: Script tag payload
const scriptPayload = '<script>alert("XSS")</script>';
const expectedScript = '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;';
assert.strictEqual(escapeHtml(scriptPayload), expectedScript);

// Test 4: Image onerror payload
const imgPayload = '<img src=x onerror="alert(\'XSS\')">';
const expectedImg = '&lt;img src=x onerror=&quot;alert(&#39;XSS&#39;)&quot;&gt;';
assert.strictEqual(escapeHtml(imgPayload), expectedImg);

// Test 5: Ampersands and single/double quotes
const specialChars = 'Fish & Chips "and" \'sushi\'';
const expectedSpecial = 'Fish &amp; Chips &quot;and&quot; &#39;sushi&#39;';
assert.strictEqual(escapeHtml(specialChars), expectedSpecial);

console.log('All XSS escape unit tests passed successfully!');
