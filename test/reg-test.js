const assert = require('assert')

const todayTrafficReg = /今日已用\n.*\s(\d+\.?\d*)([M|G]B)/
const restTrafficReg = /剩余流量[\s\S]*<span class="counter">(\d+\.?\d*)<\/span> ([M|G]B)/

const text = `<div class="card-wrap">
<div class="card-header">
    <h4>剩余流量</h4>
</div>
<div class="card-body">
    <span class="counter">65.02</span> GB
</div>
<div class="card-stats">
    <div class="card-stats-title" style="padding-top: 0;padding-bottom: 4px;">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page">今日已用
                    : 4.49GB</li>
            </ol>
        </nav>
    </div>
</div>
</div>`

const [, today, todayUnit] = text.match(todayTrafficReg)
const [, rest, restUnit] = text.match(restTrafficReg)

assert.strictEqual(today, '4.49')
assert.strictEqual(todayUnit, 'GB')
assert.strictEqual(rest, '65.02')
assert.strictEqual(restUnit, 'GB')

console.log('Test passed ✅')
