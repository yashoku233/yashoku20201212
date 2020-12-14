$(function () {
  $("#goToRegi").click(function () {
    $(".register").show();
    $(".login").hide();
  });

  $("#goToLogin").click(function () {
    $(".register").hide();
    $(".login").show();
  });

  let form = layui.form;

  form.verify({
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repass: function (value) {
      if (value !== $(".passInp").val()) {
        return "两次输入的密码不一样";
      }
    },
  });

  $("#regiForm").on("submit", function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "http://ajax.frontend.itheima.net/api/reguser",
      data,
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg("注册成功");
        $("#regiForm")[0].reset();
        $("#goToLogin").click();
      },
    });
  });

  //登录功能
  $("#loginForm").on("submit", function (e) {
    e.preventDefault();

    let data = $(this).serialize();

    $.ajax({
      type: "POST",
      url: "http://ajax.frontend.itheima.net/api/login",
      data,
      success: function (res) {
        console.log(res);

        if (res.status !== 0) {
          // 登录失败
          return layer.msg(res.message);
        }

        // 登录成功
        // layer.msg("登录成功, 即将跳转到首页");
        // 跳转页面 ==> 弹框刚出现，就跳转了（弹框关闭之后在跳转）
        // location.href = "/home/index.html";

        localStorage.setItem("token", res.token);
        // 上面代码的改写
        layer.msg(
          "登录成功, 即将跳转到首页",
          {
            time: 2000, // 2秒后关闭，关闭之后在跳转
          },
          function () {
            location.href = "/home/homepage.html";
          }
        );
      },
    });
  });
});
