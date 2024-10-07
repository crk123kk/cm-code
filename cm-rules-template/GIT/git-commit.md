# git commit 规范

    <type>(<scope>): <subject>

        type(必须)：用于说明 commit 的类别，只允许使用下面7个标识。

        scope（可选项）：用于说明 commit 影响的范围，比如 G2、G4、R1、Ford等等，视项目不同而不同。

        subject：是 commit 目的的简短描述，不超过50个字符。比如是修复一个 bug 或是增加一个 feature

    git commit -m "fi(R3): IDEAL-1994"

    是由插件可以提供规范的，也就是如果不按照规范的话，插件会禁止提交

# git commit 常见 type 类型

        Type(中文)	 Type类型(英文)	        描述
        功能	        feat	        新增 feature
        修复	        fix	            修复 bug
        文档	        docs	        仅仅修改了文档，比如 README, CHANGELOG, CONTRIBUTE等等
        格式	        style	        仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑
        重构	        refactor	    代码重构，没有加新功能或者修复 bug
        优化	        perf	        优化相关，比如提升性能、体验
        测试	        test	        测试用例，包括单元测试、集成测试等
        回滚	        chore	        改变构建流程、或者增加依赖库、工具等
        更新	        revert	        回滚到上一个版本
