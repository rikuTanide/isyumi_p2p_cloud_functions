import 'dart:io';

void main(List<String> args) {
  var file = args[0];

  var str = new File(file).readAsStringSync();
  var rep = str
      .replaceAll("BandMan", "Member")
      .replaceAll("Band", "Group")
      .replaceAll("Sound", "Item")
      .replaceAll("band_man", "member")
      .replaceAll("band", "group")
      .replaceAll("sound", "item");
  new File(file).writeAsStringSync(rep);
}
