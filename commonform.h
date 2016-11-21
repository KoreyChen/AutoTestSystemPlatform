#ifndef COMMONFORM_H
#define COMMONFORM_H

#include <QWidget>
#include <QStylePainter>
#include <QTextCursor>
#include <QObject>
#include <QSerialPort>
#include <QSerialPortInfo>
#include <qDebug>
#include <QColor>
#include <QMessageBox>
#include <QException>
#include <QIcon>
#include <QTimer>
#include <QTextCodec>
#include <QKeyEvent>
#include <QEvent>
#include <QTextEdit>
namespace Ui {
class CommonForm;
}

class CommonForm : public QWidget
{
    Q_OBJECT

public:
    explicit CommonForm(QWidget *parent = 0);
    ~CommonForm();

    QSerialPort *serialPortA;
    QSerialPort *serialPortB;

    int screen_width;
    int screen_hight;

protected:
    bool eventFilter(QObject *obj, QEvent *e);

private slots:
    void on_hideSetingPushButton_clicked();
    void on_selectViewComboBox_currentIndexChanged(int index);

    void on_comAModelChangePushButton_clicked();

    void on_comBModelChangePushButton_clicked();

    void on_comAOpenPushButton_clicked();

    void on_comBOpenPushButton_clicked();

    void slotRedComAData();

    void slotRedComBData();

    void on_comASendPushButton_clicked();

    void on_comBSendPushButton_clicked();

    void on_comADataTextEdit_textChanged();

    void on_comBDataTextEdit_textChanged();

    void on_comBCharReceiveRadioButton_clicked();

    void on_comACharReceiveRadioButton_clicked();

    void on_comAHexReceiveRadioButton_clicked();

    void on_comBHexReceiveRadioButton_clicked();

    void on_comBHexSendRadioButton_clicked();

    void on_comAHexSendRadioButton_clicked();

    void on_comACharSendRadioButton_clicked();

    void on_comBCharSendRadioButton_clicked();

    void on_comBClearCountPushButton_clicked();

    void on_comAClearCountPushButton_clicked();

    void on_comAClearPushButton_clicked();

    void on_comBClearPushButton_clicked();

    void on_comAAutoSendCheckBox_clicked();

    void comATimerSlot();

    void comBTimerSlot();


    void on_comBAutoSendCheckBox_clicked();

private:
    Ui::CommonForm *ui;

    QSerialPortInfo *serialInfo;

    QString comAName;
    int comABaudRate;
    QSerialPort::StopBits comAStopBits;
    QSerialPort::Parity   comADataParity;
    QSerialPort::DataBits comADataBits;
    int comAReadBufferSize;

    void getComASetting();
    void setComA();

    QString comBName;
    int comBBaudRate;
    QSerialPort::StopBits comBStopBits;
    QSerialPort::Parity   comBDataParity;
    QSerialPort::DataBits comBDataBits;
    int comBReadBufferSize;

    void getComBSetting();
    void setComB();

    void comAStatusShow(QString *str);
    void comBStatusShow(QString *str);

    bool comAOpenStatus;
    bool comBOpenStatus;

    QPalette::ColorRole ComAOpenColor;
    QPalette::ColorRole ComBOpenColor;
    QByteArray comARecivedataArry;
    QByteArray comBRecivedataArry;
    bool comACharShow;
    bool comBCharShow;

    bool comACharSend;
    bool comBCharSend;

    int comASendDataCount;
    int comBSendDataCount;
    int comAReciveDataCount;
    int comBReciveDataCount;

    QTimer *comATimer;
    QTimer *comBTimer;

    void comASendWindowInsertChar();
    void comBSendWindowInsertChar();
};

#endif // COMMONFORM_H
