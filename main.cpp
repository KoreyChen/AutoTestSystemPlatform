#include "atsp.h"
#include <QApplication>
#include <QTranslator>

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);
    QTranslator translator;
    translator.load("atsp.pm");
    a.installTranslator(&translator);
    ATSP w;
    w.show();
    return a.exec();
}
