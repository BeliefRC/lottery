import $ from 'jquery';

class Interface {
    // 获取遗漏
    getOmit(issue) {
        const _this = this;
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/get/omit',
                data: {
                    issue
                },
                dataType: 'json',
                success(res) {
                    _this.setOmit(res.data);
                    resolve.call(_this, res)
                },
                error(err) {
                    reject.call(err)
                }
            })
        });
    }

    // 获取开奖号码
    getOpenCode(issue) {
        const _this = this;
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/get/opencode',
                data: {
                    issue
                },
                dataType: 'json',
                success(res) {
                    _this.setOpenCode(res, data);
                    resolve.call(_this)
                },
                error(err) {
                    reject.call(err)
                }
            })
        });
    }

    // 获取当前状态
    getState(issue) {
        const _this = this;
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/get/state',
                data: {
                    issue
                },
                dataType: 'json',
                success(res) {
                    resolve.call(_this, res)
                },
                error(err) {
                    reject.call(err)
                }
            })
        });
    }
}

export default Interface;