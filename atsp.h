#ifndef ATSP_H
#define ATSP_H

#include <QMainWindow>
#include <QStylePainter>
#include <QFileDialog>
#include <QLabel>
#include <QPixmap>
#include <QDesktopWidget>
#include <QMessageBox>
#include <QDateTime>
#include <QClipboard>
#include <QFileInfo>
#include <QDesktopServices>
#include <QApplication>
#include <QDesktopWidget>
#include <QRect>
#include <QProcess>

#include "commonform.h"
#include "testsystemform.h"
#include "welcomeform.h"
#include "canform.h"
#include "ethernetform.h"
#include "aboutdialog.h"
#include "helpdialog.h"
#include "fullform.h"
#include "iicspi.h"

namespace Ui {
class ATSP;
}

class ATSP : public QMainWindow
{
    Q_OBJECT

public:
    explicit ATSP(QWidget *parent = 0);
    ~ATSP();
    void SetAreaWidget(int num);
    TestSystemForm  *P_testsystemform ;
    CommonForm      *P_commonform     ;
    WelcomeForm     *P_welcomeform    ;
    EthernetForm    *P_ethernetform   ;
    CanForm         *P_canform        ;
    FullForm        *P_fullform       ;
    IICSPI          *P_iicspiform     ;
private slots:

    void on_welcomeToolButton_clicked();

    void on_atspToolButton_clicked();

    void on_commonToolButton_clicked();

    void on_rs485ToolButton_clicked();

    void on_canToolButton_clicked();

    void on_ethernetToolButton_clicked();

    void on_actionAbout_triggered();

    void on_actionHelp_triggered();

    void on_actionOpen_O_triggered();

    void on_actionPrintScreen_triggered();

    void on_actionViewPictures_triggered();

    void on_actionToolsBar_triggered();

    void on_actionTopScreen_triggered();

    void on_iicspiToolButton_clicked();

    void on_actionScreenshot_triggered();

private:
    Ui::ATSP *ui;
    QLabel   *msgLabel;
    QPixmap  pixmap;

};

#endif // ATSP_H
