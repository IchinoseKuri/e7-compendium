<template>
    <footer id="the-footer">
        <div class="container">
            <div class="row">
                <div class="col-sm-6">
                    Epic Seven Compendium Footer Text.
                </div>
                <div class="col-sm-6">
                    © 2020 Copyright
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'the-footer',
    props: {
        msg: String
    }
}
</script>

<style lang="less">
@import '~../less/variables.less';

#the-footer {
    background-color: @bgcolor;
    padding: 10px 0px;
}
</style>
