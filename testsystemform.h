#ifndef TESTSYSTEMFORM_H
#define TESTSYSTEMFORM_H

#include <QWidget>

#include "commonform.h"
#include "canform.h"
#include "ethernetform.h"

namespace Ui {
class TestSystemForm;
}

class TestSystemForm : public QWidget
{
    Q_OBJECT

public:
    explicit TestSystemForm(QWidget *parent = 0);
    ~TestSystemForm();

    CommonForm      *T_commonform     ;
    EthernetForm    *T_ethernetform   ;
    CanForm         *T_canform        ;

private slots:
    void on_editPushButton_clicked();

private:
    Ui::TestSystemForm *ui;
};

#endif // TESTSYSTEMFORM_H
