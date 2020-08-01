# gitlab 远程控制

## 安装

1.

```sh
npm i gitlab-backup-remote-ctrl -g
```

2. 开放端口 `81`

```sh
firewall-cmd --zone=public --add-port=81/tcp --permanent
firewall-cmd --reload
```

## 自动启动
```sh
echo -e "gitlab-backup-remote-ctrl&" >> /etc/rc.local
```

## 备份
