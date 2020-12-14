function getInfo() {
  $.ajax({
    url: "/my/userinfo",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    success: function (res) {
      console.log(res);
      if (res.status !== 0) {
        return layer.msg("获取用户信息失败");
      }

      let name = res.data.nickname || res.data.username;

      $("#welcome").text("欢迎您," + name);

      if (res.data.user_pic) {
      } else {
        let frist = name[0].toUpperCase();
        $(".textAvatar").show().text(frist);
        $(".layui-nav-img").hide();
      }
    },
  });
}
getInfo();
