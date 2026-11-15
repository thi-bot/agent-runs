import urllib.request,urllib.error,json,pathlib
out=pathlib.Path(__file__).parent/'http'
base={'Content-Type':'application/json','Accept':'application/json, text/event-stream','MCP-Protocol-Version':'2026-07-28','User-Agent':'GuideReadinessReview/1.0'}
meta={'io.modelcontextprotocol/protocolVersion':'2026-07-28','io.modelcontextprotocol/clientInfo':{'name':'guide-readiness-review','version':'1.0'},'io.modelcontextprotocol/clientCapabilities':{}}
for name,method,params,extra in [('discover-no-method','server/discover',{'_meta':meta},{}),('discover-correct-method','server/discover',{'_meta':meta},{'MCP-Method':'server/discover'}),('tools-list','tools/list',{'_meta':meta},{'MCP-Method':'tools/list'}),('downgrade-correct-method','server/discover',{'_meta':{**meta,'io.modelcontextprotocol/protocolVersion':'1900-01-01'}},{'MCP-Method':'server/discover','MCP-Protocol-Version':'1900-01-01'})]:
 payload={'jsonrpc':'2.0','id':name,'method':method,'params':params}
 headers={**base,**extra}
 try:r=urllib.request.urlopen(urllib.request.Request('https://guide.wagtail.org/mcp',data=json.dumps(payload).encode(),headers=headers),timeout=30)
 except urllib.error.HTTPError as e:r=e
 body=r.read().decode();rec={'status':r.status,'request':payload,'request_headers':headers,'response':json.loads(body)}
 (out/(name+'.json')).write_text(json.dumps(rec,indent=2));print(name,r.status,body[:1400])
