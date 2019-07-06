' Gives Working Direcctory
Dim WshShell, strCurDir
Set WshShell = CreateObject("WScript.Shell")
strCurDir    = WshShell.CurrentDirectory

' Gives Parent Direcctory
Dim oFSO : Set oFSO = CreateObject("Scripting.FileSystemObject")
Dim sScriptDir : sScriptDir = oFSO.GetParentFolderName(WScript.ScriptFullName)

Dim WinScriptHost
Set WinScriptHost = CreateObject("WScript.Shell")
WinScriptHost.Run Chr(34) & sScriptDir & "\runfs.bat" & Chr(34), 0
Set WinScriptHost = Nothing