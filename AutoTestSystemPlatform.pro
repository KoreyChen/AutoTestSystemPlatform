#-------------------------------------------------
#
# Project created by QtCreator 2016-03-03T20:32:32
#
#-------------------------------------------------

QT       += core gui
QT       += serialport
greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

TARGET = AutoTestSystemPlatform
TEMPLATE = app


SOURCES += main.cpp\
        atsp.cpp \
    canform.cpp \
    commonform.cpp \
    ethernetform.cpp \
    welcomeform.cpp \
    testsystemform.cpp \
    aboutdialog.cpp \
    helpdialog.cpp \
    fullform.cpp

HEADERS  += atsp.h \
    canform.h \
    commonform.h \
    ethernetform.h \
    welcomeform.h \
    testsystemform.h \
    aboutdialog.h \
    helpdialog.h \
    fullform.h

FORMS    += atsp.ui \
    canform.ui \
    commonform.ui \
    ethernetform.ui \
    welcomeform.ui \
    testsystemform.ui \
    aboutdialog.ui \
    helpdialog.ui \
    fullform.ui

RESOURCES += \
    resource.qrc

TRANSLATIONS += atsp.ts

RC_ICONS = "Green.ico"
