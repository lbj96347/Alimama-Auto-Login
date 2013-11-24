#coding:utf-8
__author__ = 'cashlee'
import urllib,urllib2,cookielib,re
from hashlib import md5
class alimama:
    def __init__(self):
        self.header = {'User-Agent':'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.95 Safari/537.36'}
        #cookie 支持
        self.cookie_handle = cookielib.CookieJar()
        self.opener = urllib2.build_opener(urllib2.HTTPCookieProcessor(self.cookie_handle))
        urllib2.install_opener(self.opener)
    #登陆
    def login(self,username,passwd):
        login_data = {
            'logname':'',
            'originalLogpasswd':'',
            'logpasswd':'',
            'proxy':'',
            'redirect':'',
            'style':''
        }
        login_data['logname'] =username
        login_data['originalLogpasswd'] =passwd
        login_data['logpasswd'] = md5(login_data['originalLogpasswd']).hexdigest()
        source = urllib2.urlopen('http://www.alimama.com/member/minilogin.htm').read()
        token_list = re.findall(r"input name='_tb_token_' type='hidden' value='([a-zA-Z0-9]+)'", source)
        login_data['_tb_token_'] = token_list[0] if token_list else ''
        loginurl = 'https://www.alimama.com/member/minilogin_act.htm'
        #拼接post数据
        login_data = urllib.urlencode(login_data)
        self.header['Referer'] = 'http://www.alimama.com/member/minilogin.htm'
        print login_data
        try:
            print 'ready to open login page and get cookies'
            for item in self.cookie_handle :
              print item
            req = urllib2.Request(url=loginurl,data=login_data,headers=self.header)
            resp =urllib2.urlopen(req)
            html = resp.read()
            #print html
            if str(resp.url).find('success')!=-1:
                '''
                for item in self.cookie_handle :
                  print item
                '''
                return True
        except Exception,e:
            print e
            return False
    #获取商品的推广链接
    def getUrl(self,url):
        try:
            item_id = re.search(r"id=(\d+)",url)
            item_id = item_id.group(1)
            html = urllib2.urlopen('http://u.alimama.com/union/spread/common/allCode.htm?specialType=item&auction_id='+item_id).read()
            rule = re.compile(r"var clickUrl = \'([^\']+)")
            return rule.search(html).group(1)
        except Exception,e:
            print e
            return False

#example
ali = alimama()
if ali.login('cashlee96347@gmail.com','cash76104756258'):
   url = ali.getUrl('http://item.taobao.com/item.htm?spm=a1z10.1.w4004-1205618817.6.Evkf6O&id=19322457214')
   if url:
       print url
   else:
       print '获取推广链接失败'
else:
   print '登陆失败'

